import { Button, Card, Form, Modal, Select, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import { porterApi } from "~/api";
import { DeploymentUnit, DeployTaskCreationRequest } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { dateFormat } from "~/utils";
import { finalized, TaskState } from "~/views/state";

export interface DeployTasksViewProps {
    unit?: DeploymentUnit;
}

export const DeployTasksView = (props: DeployTasksViewProps) => {
    const list = useAsync(porterApi.listDeployTasks.bind(porterApi));
    const deploy = useAsync(porterApi.createDeployTask.bind(porterApi));
    const listBuildTasks = useAsync(porterApi.listBuildTasks.bind(porterApi));
    const { paging, setTotal, pagination, setPaging } = usePagination();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm<DeployTaskCreationRequest>();
    const [refresh, setRefresh] = useState(dayjs().unix());
    const [versions, setVersions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        if (props.unit) {
            list.run({ id: props.unit.project, unit: props.unit.id, page: paging.page, size: paging.size });
        }
    }, [props.unit, paging.page, paging.size, refresh]);

    useEffect(() => {
        setPaging(1, 20);
    }, [props.unit?.id]);

    useEffect(() => {
        if (props.unit?.project) {
            listBuildTasks.run({ id: props.unit.project, state: [2], page: 1, size: 50 });
        }
    }, [props.unit?.project]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
            if (list.data?.results?.find((it) => !finalized.has(it.state ?? 0))) {
                const timer = setTimeout(() => setRefresh(dayjs().unix()), 3 * 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [list.state]);

    useEffect(() => {
        if (deploy.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                setPaging(1, paging.size);
                setRefresh(dayjs().unix());
                setVisible(false);
            });
        }
    }, [deploy.state]);

    useEffect(() => {
        if (listBuildTasks.state === "COMPLETED") {
            const options = listBuildTasks.data?.results?.map((it) => ({ value: it.version, label: it.version })) ?? [];
            setVersions(options);
        }
    }, [listBuildTasks.state]);

    const columns = [
        { title: "版本", dataIndex: "version", key: "version" },
        { title: "状态", dataIndex: "state", key: "state", render: (v: number) => <TaskState state={v} /> },
        { title: "发布时间", dataIndex: "createdAt", key: "createdAt", render: dateFormat },
        { title: "执行人", dataIndex: ["createdBy", "username"], key: "createdBy" },
    ];

    const handleSubmit = (request: DeployTaskCreationRequest) => {
        if (props.unit) {
            deploy.run({
                id: props.unit.project,
                deployTaskCreationRequest: { deploymentUnit: props.unit.id, version: request.version },
            });
        }
    };

    const handleOpenModal = () => {
        unstable_batchedUpdates(() => {
            form.resetFields();
            setVisible(true);
        });
    };

    const extra = (
        <Button type={"primary"} size={"middle"} onClick={handleOpenModal}>
            发布新版本
        </Button>
    );

    return (
        <Card style={{ margin: 8 }} title={"发布历史"} extra={extra}>
            <Table columns={columns} dataSource={list.data?.results} rowKey={"id"} pagination={pagination} />
            <Modal
                open={visible}
                title={"发布新版本"}
                onOk={form.submit}
                onCancel={() => setVisible(false)}
                confirmLoading={deploy.loading}
            >
                <Form onFinish={handleSubmit} form={form}>
                    <Form.Item name={"version"} label={"版本"}>
                        <Select options={versions} />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};
