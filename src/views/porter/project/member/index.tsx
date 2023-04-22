import { useLocalStorageState } from "ahooks";
import { Avatar, Badge, Button, Card, Form, Modal, Segmented, Select, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";

import { porterApi, userApi } from "~/api";
import { AUTHORIZATION_STORAGE_KEY } from "~/constants";
import { Authorization, Project, ProjectMember, ProjectMemberMutationRequest } from "~/generated";
import { useAsync } from "~/hooks";

export interface ProjectMemberViewProps {
    project?: Project;
}

export const ProjectMemberView = (props: ProjectMemberViewProps) => {
    const get = useAsync(porterApi.getProjectMembers.bind(porterApi));
    const add = useAsync(porterApi.addProjectMembers.bind(porterApi));
    const remove = useAsync(porterApi.removeProjectMembers.bind(porterApi));
    const search = useAsync(userApi.listUsers.bind(userApi));
    const [members, setMembers] = useState<ProjectMember[]>([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm<ProjectMemberMutationRequest>();
    const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
    const [authorization] = useLocalStorageState<Authorization>(AUTHORIZATION_STORAGE_KEY);

    useEffect(() => {
        if (props.project?.id) {
            get.run({ id: props.project.id, size: 100 });
        }
    }, [props.project?.id]);

    useEffect(() => {
        if (get.state === "COMPLETED") {
            setMembers(get.data?.results ?? []);
        }
    }, [get.state]);

    useEffect(() => {
        if (search.state === "COMPLETED") {
            const opts = search.data?.results?.map?.((it) => ({ label: it.username, value: it.id }));
            setOptions(opts ?? []);
        }
    }, [search.state]);

    useEffect(() => {
        if (add.state === "COMPLETED") {
            setVisible(false);
            if (props.project?.id) {
                get.run({ id: props.project.id, size: 100 });
            }
        }
    }, [add.state]);

    useEffect(() => {
        if (remove.state === "COMPLETED") {
            if (props.project?.id) {
                get.run({ id: props.project.id, size: 100 });
            }
        }
    }, [remove.state]);

    const openAddModal = () => {
        setVisible(true);
    };

    const handleSearch = (kw: string) => {
        search.run({ kw });
    };

    const handleAdd = (request: ProjectMemberMutationRequest) => {
        if (props.project?.id) {
            add.run({ id: props.project.id, projectMemberMutationRequest: request });
        }
    };

    const handleRemove = (user: number) => {
        if (props.project?.id) {
            remove.run({ id: props.project.id, user });
        }
    };

    const extra = (
        <Space>
            <Button size={"middle"} type={"primary"} onClick={openAddModal}>
                增加
            </Button>
        </Space>
    );

    return (
        <Card style={{ margin: 8 }} title={"项目成员"} loading={get.loading} extra={extra}>
            <Space>
                {members.map((m) => (
                    <Tooltip
                        title={
                            <Space>
                                {m.user.username}{" "}
                                <Button
                                    type={"link"}
                                    onClick={() => handleRemove(m.user.id)}
                                    disabled={m.user.id === authorization.user.id}
                                >
                                    移除
                                </Button>
                            </Space>
                        }
                        key={m.user.id}
                    >
                        <Badge dot={m.role === 1}>
                            <Avatar shape={"square"}>{m.user.username[0].toUpperCase()}</Avatar>
                        </Badge>
                    </Tooltip>
                ))}
            </Space>
            <Modal open={visible} title={"增加成员"} onOk={() => form.submit()} onCancel={() => setVisible(false)}>
                <Form form={form} onFinish={handleAdd} labelCol={{ span: 3 }}>
                    <Form.Item label={"用户"} name={"user"} rules={[{ required: true }]}>
                        <Select onSearch={handleSearch} filterOption={false} showSearch={true} options={options} />
                    </Form.Item>
                    <Form.Item label={"角色"} name={"role"} required={true}>
                        <Segmented
                            block
                            options={[
                                { label: "一般成员", value: 0 },
                                { label: "管理员", value: 1 },
                                { label: "协作者", value: 2 },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};
