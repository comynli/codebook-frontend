import { Button, Card, Form, Input, PageHeader, Select, SelectProps, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import { iacApi } from "~/api";
import { ExecuteRequest } from "~/generated";
import { useAsync } from "~/hooks";

export default () => {
    const execute = useAsync(iacApi.execute.bind(iacApi));
    const [form] = Form.useForm<ExecuteRequest>();
    const [options, setOptions] = useState<SelectProps["options"]>([]);
    const navigate = useNavigate();
    const list = useAsync(iacApi.listRepositories.bind(iacApi));
    const get = useAsync(iacApi.getRepository.bind(iacApi));
    const [query] = useSearchParams();

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setOptions(list.data?.results?.map?.((it) => ({ label: it.name, value: it.id })) ?? []);
        }
    }, [list.state]);

    useEffect(() => {
        if (execute.state === "COMPLETED") {
            navigate(`../${execute.data?.id}`);
        }
    }, [execute.state]);

    useEffect(() => {
        if (get.state === "COMPLETED") {
            setOptions([{ label: get.data?.name, value: get.data?.id }]);
            form.setFieldValue("repository", get.data?.id);
        }
        if (get.state === "FAILED") {
            handleSearchRepository("");
        }
    }, [get.state]);

    useEffect(() => {
        const repository = query.get("repository");
        if (repository) {
            const id = Number.parseInt(repository);
            get.run({ id });
        } else {
            handleSearchRepository("");
        }
    }, []);

    const handleExecute = (request: ExecuteRequest) => {
        if (request.repository) {
            execute.run({ executeRequest: request });
        }
    };

    const handleSearchRepository = (kw: string) => {
        list.run({ page: 1, size: 20, kw });
    };

    return (
        <Spin spinning={execute.loading || list.loading}>
            <PageHeader title={"创建任务"} onBack={() => navigate("..")} />
            <Card style={{ marginTop: 8 }}>
                <Form form={form} labelCol={{ span: 2 }} onFinish={handleExecute}>
                    <Form.Item label={"仓库"} name={"repository"} rules={[{ required: true }]}>
                        <Select options={options} showSearch filterOption={false} onSearch={handleSearchRepository} />
                    </Form.Item>
                    <Form.Item
                        label={"Playbook"}
                        name={"playbook"}
                        rules={[{ required: true }]}
                        initialValue={"site.yml"}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Inventories"} name={"inventories"}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label={"envvars"} name={"envvars"}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label={"extravars"} name={"extravars"}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2 }}>
                        <Button type={"primary"} htmlType={"submit"} danger>
                            执行
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Spin>
    );
};
