import { Button, Card, PageHeader, Space, Spin, Table } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { iacApi } from "~/api";
import { useAsync, usePagination } from "~/hooks";

export default () => {
    const list = useAsync(iacApi.listRepositories.bind(iacApi));
    const { paging, pagination, setTotal } = usePagination();
    const navigate = useNavigate();

    useEffect(() => {
        list.run(paging);
    }, [paging.page, paging.size]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    const handleExecute = (id: number) => {
        navigate(`/iac/task/create?repository=${id}`);
    };

    const columns = [
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "地址", dataIndex: "gitUrl", key: "url" },
        {
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: Date) => dayjs(text).format("YYYY-MM-DD hh:mm:ss"),
        },
        { title: "创建人", dataIndex: ["createdBy", "username"], key: "createdBy" },
        {
            title: "修改时间",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text: Date) => dayjs(text).format("YYYY-MM-DD hh:mm:ss"),
        },
        { title: "修改人", dataIndex: ["updatedBy", "username"], key: "updatedBy" },
        {
            title: "",
            dataIndex: "id",
            key: "op",
            render: (id: number) => {
                return (
                    <Space>
                        <Button type={"primary"} size={"small"} ghost>
                            <Link to={`${id}/edit`}>修改</Link>
                        </Button>
                        <Button type={"primary"} size={"small"} onClick={() => handleExecute(id)} ghost danger>
                            执行
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const extra = (
        <Button type={"primary"}>
            <Link to={"./create"}>新增</Link>
        </Button>
    );

    return (
        <Spin spinning={list.loading}>
            <PageHeader title="仓库列表" extra={extra}></PageHeader>
            <Card style={{ margin: 8 }}>
                <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"id"}></Table>
            </Card>
        </Spin>
    );
};
