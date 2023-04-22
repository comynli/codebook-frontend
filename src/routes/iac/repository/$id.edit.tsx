import { Button, Card, Form, Input, PageHeader, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { iacApi } from "~/api";
import { Repository } from "~/generated";
import { useAsync } from "~/hooks";

export default () => {
    const params = useParams<"id">();
    const [form] = Form.useForm<Repository>();
    const update = useAsync(iacApi.updateRepository.bind(iacApi));
    const get = useAsync(iacApi.getRepository.bind(iacApi));
    const navigate = useNavigate();
    const [id, setId] = useState<number>();

    useEffect(() => {
        if (params.id) {
            const id = Number.parseInt(params.id);
            setId(id);
        }
    }, [params.id]);

    useEffect(() => {
        if (id) {
            get.run({ id });
        }
    }, [id]);

    useEffect(() => {
        if (get.state === "COMPLETED" && get.data) {
            form.setFieldsValue(get.data);
        }
    }, [get.state]);

    useEffect(() => {
        if (update.state === "COMPLETED") {
            navigate("..");
        }
    }, [update.state]);

    const handleSubmit = (value: Partial<Repository>) => {
        if (id) {
            update.run({ id, repositoryMutationRequest: value });
        }
    };

    return (
        <Spin spinning={update.loading || get.loading}>
            <PageHeader title={"修改"} />
            <Card style={{ margin: 8 }}>
                <Form form={form} labelCol={{ span: 2 }} onFinish={handleSubmit}>
                    <Form.Item label={"名称"} name={"name"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"地址"} name={"gitUrl"}>
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
