import { Button, Card, Descriptions, PageHeader, Space, Spin, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { iacApi } from "~/api";
import { BooleanTag } from "~/components/boolean";
import { useAsync, usePagination } from "~/hooks";
import { dateFormat } from "~/utils";
import { IacTaskState } from "~/views/iac/task/state";

export default () => {
    const params = useParams<"id">();
    const get = useAsync(iacApi.getPeriodicTask.bind(iacApi));
    const [id, setId] = useState<number>();
    const navigate = useNavigate();
    const list = useAsync(iacApi.listRelatedTasks.bind(iacApi));
    const { paging, pagination, setTotal } = usePagination();

    useEffect(() => {
        if (id) {
            list.run({ id, page: paging.page, size: paging.size });
        }
    }, [paging.page, paging.size, id]);

    useEffect(() => {
        if (params.id) {
            const id = Number.parseInt(params.id);
            if (Number.isSafeInteger(id) && id > 0) {
                setId(id);
            }
        }
    }, [params.id]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    useEffect(() => {
        if (id) {
            get.run({ id });
        }
    }, [id]);

    const columns = [
        { title: "仓库", dataIndex: ["repository", "name"], key: "repository" },
        {
            title: "commit",
            dataIndex: "commitId",
            key: "commit",
            render: (text: string) => (
                <Typography.Text copyable={{ text: text }}>{text.substring(0, 7)}</Typography.Text>
            ),
        },
        { title: "状态", dataIndex: "state", key: "state", render: (state: number) => <IacTaskState state={state} /> },
        { title: "开始时间", dataIndex: "createdAt", key: "createdAt", render: dateFormat },
        { title: "结束时间", dataIndex: "updatedAt", key: "updatedAt", render: dateFormat },
        {
            title: "",
            dataIndex: "id",
            key: "op",
            render: (id: number) => {
                return (
                    <Space>
                        <Button type={"link"} size={"small"}>
                            <Link to={`/iac/task/${id}`}>查看</Link>
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const cron = get.data?.periodic.crontab;
    return (
        <Spin spinning={get.loading}>
            <PageHeader
                title={get.data?.repository.name}
                subTitle={`${cron?.minute} ${cron?.hour} ${cron?.dayOfMonth} ${cron?.monthOfYear} ${cron?.dayOfWeek}`}
                onBack={() => navigate("..")}
            />
            <Card style={{ margin: 8 }}>
                <Descriptions column={3} bordered>
                    <Descriptions.Item label={"playbook"}>{get.data?.playbook}</Descriptions.Item>
                    <Descriptions.Item label={"enabled"}>
                        <BooleanTag value={get.data?.periodic.enabled} />
                    </Descriptions.Item>
                    <Descriptions.Item label={"one off"}>
                        <BooleanTag value={get.data?.periodic.oneOff} />
                    </Descriptions.Item>
                    <Descriptions.Item label={"Inventories"} span={3}>
                        <pre>{get.data?.inventories}</pre>
                    </Descriptions.Item>
                    <Descriptions.Item label={"envvars"} span={3}>
                        <pre>{get.data?.envvars}</pre>
                    </Descriptions.Item>
                    <Descriptions.Item label={"extravars"} span={3}>
                        <pre>{get.data?.extravars}</pre>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card style={{ margin: 8 }} title={"相关任务"}>
                <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"id"}></Table>
            </Card>
        </Spin>
    );
};
