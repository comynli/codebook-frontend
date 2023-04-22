import { Button, Card, Descriptions, Form, Input, InputNumber, Space } from "antd";
import { useEffect, useState } from "react";

import { porterApi } from "~/api";
import { BuildSetting, Project } from "~/generated";
import { useAsync } from "~/hooks";

export interface BuildSettingViewProps {
    project?: Project;
}

export const BuildSettingView = (props: BuildSettingViewProps) => {
    const get = useAsync(porterApi.getBuildSetting.bind(porterApi));
    const save = useAsync(porterApi.saveBuildSetting.bind(porterApi));
    const [setting, setSetting] = useState<BuildSetting>();
    const [editing, setEditing] = useState(false);
    const [form] = Form.useForm<BuildSetting>();

    useEffect(() => {
        if (props.project?.id) {
            get.run({ id: props.project.id });
        }
    }, [props.project?.id]);

    useEffect(() => {
        if (get.state === "COMPLETED") {
            setSetting(get.data);
        }
        if (get.state === "FAILED") {
            setEditing(true);
        }
    }, [get.state]);

    useEffect(() => {
        if (save.state === "COMPLETED") {
            setSetting(save.data);
            if (save.data) {
                setEditing(false);
            }
        }
    }, [save.state]);

    const handleEdit = () => {
        setEditing(true);
        form.setFieldsValue({ ...setting });
    };

    const handleCancel = () => {
        setEditing(false);
        form.resetFields();
    };

    const handleSubmit = (request: BuildSetting) => {
        if (props.project?.id) {
            save.run({ id: props.project.id, buildSettingRequest: request });
        }
    };

    if (!editing) {
        const extra = (
            <Space>
                <Button type={"primary"} size={"middle"} onClick={handleEdit}>
                    编辑
                </Button>
            </Space>
        );

        return (
            <Card style={{ margin: 8 }} loading={get.loading || save.loading} title={"构建配置"} extra={extra}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label={"仓库"} span={2}>
                        <a href={setting?.repository} target={"_blank"} rel="noreferrer">
                            {setting?.repository}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label={"Dockerfile"}>{setting?.dockerfilePath}</Descriptions.Item>
                    <Descriptions.Item label={"最大构建时间(秒)"}>{setting?.activeDeadline}</Descriptions.Item>
                    <Descriptions.Item label={"CPU请求(m)"}>{setting?.cpuRequest}</Descriptions.Item>
                    <Descriptions.Item label={"Memory请求(Mi)"}>{setting?.memoryRequest}</Descriptions.Item>
                    <Descriptions.Item label={"CPU限制(m)"}>{setting?.cpuLimit}</Descriptions.Item>
                    <Descriptions.Item label={"Memory限制(Mi)"}>{setting?.memoryLimit}</Descriptions.Item>
                </Descriptions>
            </Card>
        );
    } else {
        const extra = (
            <Space>
                <Button size={"middle"} onClick={handleCancel} disabled={!setting}>
                    取消
                </Button>
                <Button size={"middle"} type={"primary"} onClick={() => form.submit()}>
                    提交
                </Button>
            </Space>
        );

        return (
            <Card style={{ margin: 8 }} loading={get.loading || save.loading} title={"构建配置"} extra={extra}>
                <Form form={form} labelCol={{ span: 3 }} onFinish={handleSubmit}>
                    <Form.Item name={"repository"} label={"仓库"} rules={[{ required: true, type: "url" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={"dockerfilePath"}
                        label={"Dockerfile"}
                        rules={[{ required: true }]}
                        initialValue={"Dockerfile"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={"activeDeadline"}
                        label={"最大构建时间(秒)"}
                        rules={[{ required: true }]}
                        initialValue={3600}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name={"cpuRequest"}
                        label={"CPU请求(m)"}
                        rules={[{ required: true }]}
                        initialValue={1000}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name={"memoryRequest"}
                        label={"Memory请求(Mi)"}
                        rules={[{ required: true }]}
                        initialValue={2000}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name={"cpuLimit"} label={"CPU限制(m)"} rules={[{ required: true }]} initialValue={2000}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name={"memoryLimit"}
                        label={"Memory限制(Mi)"}
                        rules={[{ required: true }]}
                        initialValue={4000}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Card>
        );
    }
};
