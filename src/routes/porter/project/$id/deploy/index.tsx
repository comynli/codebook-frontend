import { Button, Card, Form, Modal, PageHeader, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Link } from "react-router-dom";

import { porterApi } from "~/api";
import { Pipeline, PipelineRequest } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { TaskState } from "~/views/state";

export default () => {
    const { project } = useOutletContext<OutletContext>();
    const list = useAsync(porterApi.listPipelines.bind(porterApi));
    const { pagination, paging, setTotal } = usePagination();
    const create = useAsync(porterApi.startPipeline.bind(porterApi));
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm<PipelineRequest>();
    const listBuildTasks = useAsync(porterApi.listBuildTasks.bind(porterApi));
    const [versions, setVersions] = useState<{ value: string; label: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (project?.id) {
            listBuildTasks.run({ id: project.id, state: [2] });
        }
    }, [project?.id]);

    useEffect(() => {
        if (project?.id) {
            list.run({ id: project.id, page: paging.page, size: paging.size });
        }
    }, [paging.page, paging.size, project?.id]);

    useEffect(() => {
        if (listBuildTasks.state === "COMPLETED") {
            const options = listBuildTasks.data?.results?.map((it) => ({ value: it.version, label: it.version })) ?? [];
            setVersions(options);
        }
    }, [listBuildTasks.state]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    useEffect(() => {
        if (create.state === "COMPLETED") {
            navigate(`pipeline/${create.data?.id}`);
        }
    }, [create.state]);

    const columns = [
        {
            title: "版本",
            dataIndex: "version",
            key: "version",
            render: (version: string, r: Pipeline) => <Link to={`pipeline/${r.id}`}>{version}</Link>,
        },
        { title: "环境", dataIndex: ["current", "deploymentUnit", "stage"], key: "stage" },
        { title: "部署单元", dataIndex: ["current", "deploymentUnit", "name"], key: "unit" },
        {
            title: "状态",
            dataIndex: ["current", "state"],
            key: "state",
            render: (state: number) => <TaskState state={state} />,
        },
    ];

    const handleSubmit = (request: PipelineRequest) => {
        if (project?.id) {
            create.run({ id: project.id, pipelineRequest: request });
        }
    };

    const handleOpenModal = () => {
        form.resetFields();
        setVisible(true);
    };

    const extra = (
        <Button type={"primary"} onClick={handleOpenModal}>
            创建
        </Button>
    );

    return (
        <Spin spinning={list.loading}>
            <PageHeader title={"流水线列表"} extra={extra} />
            <Card style={{ margin: 8 }}>
                <Table columns={columns} dataSource={list.data?.results} rowKey={"id"} pagination={pagination}></Table>
            </Card>
            <Modal
                title={"版本"}
                open={visible}
                onCancel={() => setVisible(false)}
                onOk={form.submit}
                confirmLoading={create.loading}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name={"version"} label={"版本"}>
                        <Select options={versions} />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};
