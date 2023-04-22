import { Button, Card, Form, Input, PageHeader, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { iacApi } from "~/api";
import { Repository } from "~/generated";
import { useAsync } from "~/hooks";

export default () => {
    const [form] = Form.useForm<Repository>(); // useForm 创建了一个FormInstance， FormInstance决定了表单持有什么样的数据， 并且提供了一些方法来操作这些数据
    const create = useAsync(iacApi.createRepository.bind(iacApi));
    const navigate = useNavigate();

    useEffect(() => {
        if (create.state === "COMPLETED") {
            navigate("..");
        }
    }, [create.state]);

    const handleSubmit = (value: Partial<Repository>) => {
        if (value.name && value.gitUrl) {
            create.run({ repositoryRequest: { name: value.name, gitUrl: value.gitUrl } });
        }
    };

    return (
        <Spin spinning={create.loading}>
            <PageHeader title={"建仓"} />
            <Card style={{ margin: 8 }}>
                <Form form={form} labelCol={{ span: 2 }} onFinish={handleSubmit}>
                    <Form.Item label={"名称"} name={"name"} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"地址"} name={"gitUrl"} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2 }}>
                        <Button type={"primary"} htmlType={"submit"}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Spin>
    );
};
