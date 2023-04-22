import { Button, Card, Space, Table } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { porterApi } from "~/api";
import { DeploymentUnit, Project } from "~/generated";
import { useAsync, usePagination } from "~/hooks";

export interface DeploymentUnitListViewProps {
    project?: Project;
}

export const DeploymentUnitListView = (props: DeploymentUnitListViewProps) => {
    const list = useAsync(porterApi.listDeploymentUnits.bind(porterApi));
    const { pagination, paging, setTotal } = usePagination();

    useEffect(() => {
        if (props.project?.id) {
            list.run({ id: props.project.id, page: paging.page, size: paging.size });
        }
    }, [paging.page, paging.size, props.project?.id]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            render: (name: string, r: DeploymentUnit) => <Link to={`../deploy/${r.id}`}>{name}</Link>,
        },
        { title: "环境", dataIndex: ["stage", "name"], key: "stage" },
        { title: "泳道", dataIndex: ["lane", "name"], key: "lane" },
        { title: "集群", dataIndex: ["cluster", "name"], key: "cluster" },
        { title: "namespace", dataIndex: "namespace", key: "namespace" },
        {
            title: "",
            dataIndex: "id",
            key: "op",
            render: (id: number) => (
                <Space>
                    <Link to={`../deploy/${id}/edit`}>
                        <Button type={"primary"} size={"small"} ghost>
                            编辑
                        </Button>
                    </Link>
                    <Button type={"primary"} size={"small"} ghost danger>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    const extra = (
        <Link to={"../deploy/create"}>
            <Button type={"primary"}>创建</Button>
        </Link>
    );

    return (
        <Card title={"部署单元列表"} loading={list.loading} style={{ margin: 8 }} extra={extra}>
            <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"id"}></Table>
        </Card>
    );
};
