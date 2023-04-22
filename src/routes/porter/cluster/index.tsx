import { Button, Card, Form, Input, Modal, PageHeader, Popconfirm, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import { porterApi } from "~/api";
import { Cluster, ClusterRequest } from "~/generated";
import { useAsync, usePagination } from "~/hooks";

export default () => {
    const list = useAsync(porterApi.listClusters.bind(porterApi));
    const create = useAsync(porterApi.createCluster.bind(porterApi));
    const update = useAsync(porterApi.updateCluster.bind(porterApi));
    const remove = useAsync(porterApi.removeCluster.bind(porterApi));
    const { paging, pagination, setTotal } = usePagination();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm<ClusterRequest>();
    const [editing, setEditing] = useState<Cluster>();

    useEffect(() => {
        list.run({ page: paging.page, size: paging.size });
    }, [paging.page, paging.size]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    useEffect(() => {
        if (create.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                setVisible(false);
                form.resetFields();
                list.run({ page: 1, size: 200 });
            });
        }
    }, [create.state]);

    useEffect(() => {
        if (update.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                setVisible(false);
                form.resetFields();
                setEditing(undefined);
                list.run({ page: 1, size: 200 });
            });
        }
    }, [update.state]);

    useEffect(() => {
        if (remove.state === "COMPLETED") {
            list.run({ page: 1, size: 200 });
        }
    }, [remove.state]);

    const handleUpdate = (cluster: Cluster) => {
        unstable_batchedUpdates(() => {
            form.setFieldsValue(cluster);
            setEditing(cluster);
            setVisible(true);
        });
    };

    const handleRemove = (id: number) => {
        remove.run({ id });
    };

    const extra = (
        <Button type={"primary"} onClick={() => setVisible(true)}>
            增加
        </Button>
    );

    const columns = [
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "描述", dataIndex: "description", key: "description" },
        { title: "镜像仓库", dataIndex: "registry", key: "registry" },
        {
            title: "",
            dataIndex: "id",
            key: "op",
            render: (id: number, r: Cluster) => (
                <Space>
                    <Button type={"primary"} size={"small"} ghost onClick={() => handleUpdate(r)}>
                        修改
                    </Button>
                    <Popconfirm title={`您确定删除集群${r.name}吗？`} onConfirm={() => handleRemove(id)}>
                        <Button type={"primary"} size={"small"} ghost danger>
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleCloseModal = () => {
        unstable_batchedUpdates(() => {
            setVisible(false);
            form.resetFields();
        });
    };

    const handleSubmit = (request: ClusterRequest) => {
        if (editing) {
            update.run({ id: editing.id, clusterMutationRequest: request });
        } else {
            create.run({ clusterRequest: request });
        }
    };

    return (
        <Spin spinning={list.loading}>
            <PageHeader title={"集群列表"} extra={extra} />
            <Card style={{ margin: 8 }}>
                <Table columns={columns} dataSource={list.data?.results} rowKey={"id"} pagination={pagination} />
            </Card>
            <Modal
                width={"100%"}
                title={editing ? "修改集群" : "增加集群"}
                open={visible}
                onOk={form.submit}
                onCancel={handleCloseModal}
                confirmLoading={create.loading || update.loading}
            >
                <Form form={form} labelCol={{ span: 3 }} onFinish={handleSubmit}>
                    <Form.Item name={"name"} label={"名称"} rules={[{ required: true, pattern: /^[a-z0-9-]+$/ }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={"registry"} label={"镜像仓库"} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={"description"} label={"描述"} rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name={"config"} label={"集群配置文件"} rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};
