import { Button, Card, PageHeader, Space, Spin, Table } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { iacApi } from "~/api";
import { BooleanTag } from "~/components/boolean";
import { CrontabSchedule } from "~/generated";
import { useAsync, usePagination } from "~/hooks";

export default () => {
    const list = useAsync(iacApi.listPeriodicTasks.bind(iacApi));
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
        {
            title: "仓库",
            dataIndex: ["repository", "name"],
            key: "repository",
        },
        {
            title: "CRON",
            dataIndex: ["periodic", "crontab"],
            key: "crontab",
            render: (v: CrontabSchedule) => (
                <span>{`${v.minute} ${v.hour} ${v.dayOfMonth} ${v.monthOfYear} ${v.dayOfWeek}`}</span>
            ),
        },
        {
            title: "enabled",
            dataIndex: ["periodic", "enabled"],
            key: "enabled",
            render: (v: boolean) => <BooleanTag value={v} />,
        },
        {
            title: "",
            dataIndex: "id",
            key: "op",
            render: (v: number) => (
                <Space>
                    <Link to={v.toString()}>详情</Link>
                    <Link to={`${v}/edit`}>编辑</Link>
                </Space>
            ),
        },
    ];

    const extra = (
        <Space>
            <Button type={"primary"}>
                <Link to={"create"}>新建定时任务</Link>
            </Button>
        </Space>
    );

    return (
        <Spin spinning={list.loading}>
            <PageHeader title="定时任务" extra={extra} />
            <Card style={{ margin: 8 }}>
                <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"id"}></Table>
            </Card>
        </Spin>
    );
};
