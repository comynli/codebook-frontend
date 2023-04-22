import { Button, Card, PageHeader, Spin, Table } from "antd";
import { useEffect } from "react";
import { useOutletContext } from "react-router";
import { Link } from "react-router-dom";

import { porterApi } from "~/api";
import { BuildTask } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { dateFormat } from "~/utils";
import { TaskState } from "~/views/state";

export default () => {
    const { project } = useOutletContext<OutletContext>();
    const list = useAsync(porterApi.listBuildTasks.bind(porterApi));
    const { paging, pagination, setTotal } = usePagination();

    useEffect(() => {
        if (project?.id) {
            list.run({ id: project.id, page: paging.page, size: paging.size });
        }
    }, [paging.page, paging.size, project?.id]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    const columns = [
        {
            title: "版本",
            dataIndex: "version",
            key: "version",
            render: (text: string, r: BuildTask) => <Link to={r.id.toString()}>{text}</Link>,
        },
        {
            title: "commit",
            dataIndex: "commitSha",
            key: "commit",
            render: (sha: string, r: BuildTask) =>
                r.commit?.url ? (
                    <a href={r.commit.url} target={"_blank"} rel="noreferrer">
                        {sha.substring(0, 7)}
                    </a>
                ) : (
                    <pre>{sha.substring(0, 7)}</pre>
                ),
        },
        { title: "状态", dataIndex: "state", key: "state", render: (state: number) => <TaskState state={state} /> },
        { title: "创建时间", dataIndex: "createdAt", key: "createdAt", render: dateFormat },
        { title: "更新时间", dataIndex: "updatedAt", key: "updatedAt", render: dateFormat },
    ];

    return (
        <Spin spinning={list.loading}>
            <PageHeader
                title={"任务列表"}
                extra={
                    <Link to={"create"}>
                        <Button type={"primary"}>创建</Button>
                    </Link>
                }
            />
            <Card style={{ margin: 8 }}>
                <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"id"} />
            </Card>
        </Spin>
    );
};
