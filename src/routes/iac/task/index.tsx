import { Button, Card, PageHeader, Space, Spin, Table, Typography } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { iacApi } from "~/api";
import { useAsync, usePagination } from "~/hooks";
import { dateFormat } from "~/utils";
import { IacTaskState } from "~/views/iac/task/state";

export default () => {
    const list = useAsync(iacApi.listTasks.bind(iacApi));
    const { paging, pagination, setTotal } = usePagination();

    useEffect(() => {
        list.run(paging);
    }, [paging.page, paging.size]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

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
        { title: "执行人", dataIndex: ["createdBy", "username"], key: "createdBy" },
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
                            <Link to={`${id}`}>查看</Link>
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const extra = (
        <Space>
            <Button type={"primary"}>
                <Link to={"create"}>新建任务</Link>
            </Button>
        </Space>
    );

    return (
        <Spin spinning={list.loading}>
            <PageHeader title="历史任务" extra={extra} />
            <Card style={{ margin: 8 }}>
                <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"id"}></Table>
            </Card>
        </Spin>
    );
};
