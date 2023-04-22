import { useLocalStorageState } from "ahooks";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import { authApi } from "~/api";
import { AUTHORIZATION_STORAGE_KEY } from "~/constants";
import { Authorization, AuthorizationRequest } from "~/generated";
import { useAsync } from "~/hooks";
import { tokenIsValid } from "~/utils";

export default () => {
    const login = useAsync(authApi.login.bind(authApi));
    const [form] = Form.useForm<AuthorizationRequest>();
    const [authorization, setAuthorization] = useLocalStorageState<Authorization>(AUTHORIZATION_STORAGE_KEY);
    const navigate = useNavigate();
    const [query] = useSearchParams();

    useEffect(() => {
        if (login.state === "COMPLETED" && login.data) {
            setAuthorization(login.data);
        }
    }, [login.state]);

    useEffect(() => {
        if (tokenIsValid(authorization)) {
            const next = query.get("next") ?? "/";
            navigate(next);
        }
    }, [authorization]);

    const handleSubmit = (value: AuthorizationRequest) => {
        login.run({ authorizationRequest: value });
    };

    return (
        <Row align="middle" justify="center" style={{ minHeight: "100vh" }}>
            <Col>
                <Card style={{ minWidth: "500px" }}>
                    <Form form={form} labelCol={{ span: 4 }} onFinish={handleSubmit}>
                        <Form.Item label={"用户名"} name={"username"} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label={"密码"} name={"password"} rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            <Button type={"primary"} htmlType={"submit"} block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};
