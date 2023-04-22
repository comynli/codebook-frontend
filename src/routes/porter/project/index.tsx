import { Button, Card, Form, Input, Modal, PageHeader, Popconfirm, Space, Spin, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { porterApi } from "~/api";
import { Project } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { dateFormat } from "~/utils";

export default () => {
    const list = useAsync(porterApi.listProjects.bind(porterApi));
    const create = useAsync(porterApi.createProject.bind(porterApi));
    const update = useAsync(porterApi.updateProject.bind(porterApi));
    const remove = useAsync(porterApi.removeProject.bind(porterApi));
    const { paging, setTotal, pagination, setPaging } = usePagination();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm<Project>();
    const [title, setTitle] = useState("创建项目");
    const [editing, setEditing] = useState(0);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        list.run({ page: paging.page, size: paging.size });
    }, [paging.page, paging.size, refresh]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    useEffect(() => {
        if (create.state === "COMPLETED") {
            setPaging(1);
            setVisible(false);
            setRefresh(dayjs().unix());
            form.resetFields();
        }
    }, [create.state]);

    useEffect(() => {
        if (update.state === "COMPLETED") {
            setPaging(1);
            setRefresh(dayjs().unix());
            setVisible(false);
            form.resetFields();
        }
    }, [update.state]);

    useEffect(() => {
        if (remove.state === "COMPLETED") {
            setPaging(1);
            setRefresh(dayjs().unix());
        }
    }, [remove.state]);

    const columns = [
        {
            title: "name",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: Project) => <Link to={record.id.toString()}>{name}</Link>,
        },
        { title: "description", dataIndex: "description", key: "description" },
        { title: "创建时间", dataIndex: "createdAt", key: "createdAt", render: dateFormat },
        {
            title: "",
            dataIndex: "id",
            key: "op",
            render: (id: number, record: Project) => (
                <Space>
                    <Button type={"primary"} size={"small"} onClick={() => showUpdateModel(record)}>
                        编辑
                    </Button>
                    <Popconfirm title={`您确认要删除项目${record.name}吗？`} onConfirm={() => handleRemove(id)}>
                        <Button type={"primary"} size={"small"} danger>
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleSubmit = (project: Project) => {
        if (editing) {
            update.run({ id: editing, projectMutationRequest: project });
        } else {
            create.run({ projectRequest: project });
        }
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    const showCreateModal = () => {
        setEditing(0);
        setTitle("创建项目");
        setVisible(true);
    };

    const showUpdateModel = (project: Project) => {
        setEditing(project.id);
        form.setFieldsValue(project);
        setTitle("修改项目");
        setVisible(true);
    };

    const handleRemove = (id: number) => {
        remove.run({ id });
    };

    const extra = (
        <Space>
            <Button type={"primary"} onClick={showCreateModal}>
                创建
            </Button>
        </Space>
    );

    return (
        <Spin spinning={list.loading || remove.loading}>
            <PageHeader title={"我的项目"} extra={extra} />
            <Card style={{ margin: 8 }} loading={create.loading || update.loading}>
                <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"id"}></Table>
            </Card>
            <Modal
                title={title}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={create.loading || update.loading}
            >
                <Form form={form} labelCol={{ span: 3 }} onFinish={handleSubmit}>
                    <Form.Item name={"name"} label={"名称"} rules={[{ required: true, pattern: /^[a-z0-9-]+$/ }]}>
                        <Input disabled={!!editing} />
                    </Form.Item>
                    <Form.Item name={"description"} label={"描述"} rules={[{ required: true }]}>
                        <Input.TextArea autoSize={{ minRows: 3 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};
