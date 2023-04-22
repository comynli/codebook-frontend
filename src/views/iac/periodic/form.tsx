import { Button, Form, FormInstance, Input, Select, Space, Switch } from "antd";

import { useRepositoriesAsOptions } from "~/hooks/repository";

export interface PeriodicFormProps<T> {
    form: FormInstance<T>;
    onSubmit: (request: T) => void;
}

export function PeriodicForm<T>(props: PeriodicFormProps<T>) {
    const [options, searchRepositories] = useRepositoriesAsOptions();

    return (
        <Form form={props.form} labelCol={{ span: 3 }} onFinish={props.onSubmit}>
            <Form.Item label={"仓库"} name={"repository"} rules={[{ required: true }]}>
                <Select options={options} showSearch filterOption={false} onSearch={searchRepositories} />
            </Form.Item>
            <Form.Item label={"playbook"} name={"playbook"} initialValue={"site.yml"}>
                <Input />
            </Form.Item>
            <Form.Item label={"CRON"} required={true}>
                <Space style={{ width: "100%" }}>
                    <Form.Item name={["periodic", "crontab", "minute"]} rules={[{ required: true }]} noStyle>
                        <Input placeholder={"分"} />
                    </Form.Item>
                    <Form.Item name={["periodic", "crontab", "hour"]} rules={[{ required: true }]} noStyle>
                        <Input placeholder={"时"} />
                    </Form.Item>
                    <Form.Item name={["periodic", "crontab", "dayOfMonth"]} rules={[{ required: true }]} noStyle>
                        <Input placeholder={"天"} />
                    </Form.Item>
                    <Form.Item name={["periodic", "crontab", "monthOfYear"]} rules={[{ required: true }]} noStyle>
                        <Input placeholder={"月"} />
                    </Form.Item>
                    <Form.Item name={["periodic", "crontab", "dayOfWeek"]} rules={[{ required: true }]} noStyle>
                        <Input placeholder={"星期"} />
                    </Form.Item>
                </Space>
            </Form.Item>
            <Form.Item label={"一次性"} name={["periodic", "oneOff"]} initialValue={false} valuePropName={"checked"}>
                <Switch />
            </Form.Item>
            <Form.Item label={"允许的"} name={["periodic", "enabled"]} initialValue={true} valuePropName={"checked"}>
                <Switch />
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
            <Form.Item wrapperCol={{ offset: 3 }}>
                <Button type={"primary"} htmlType={"submit"}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
}
