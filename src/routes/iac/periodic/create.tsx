import { Card, Form, PageHeader, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { iacApi } from "~/api";
import { PeriodicTaskCreationRequest } from "~/generated";
import { useAsync } from "~/hooks";
import { PeriodicForm } from "~/views/iac/periodic/form";

export default () => {
    const create = useAsync(iacApi.createPeriodicTask.bind(iacApi));
    const [form] = Form.useForm<PeriodicTaskCreationRequest>();
    const navigate = useNavigate();

    useEffect(() => {
        if (create.state === "COMPLETED") {
            navigate("..");
        }
    }, [create.state]);

    const handleSubmit = (request: PeriodicTaskCreationRequest) => {
        create.run({ periodicTaskCreationRequest: request });
    };

    return (
        <Spin spinning={create.loading}>
            <PageHeader title={"创建定时任务"} onBack={() => navigate("..")} />
            <Card style={{ margin: 8 }}>
                <PeriodicForm form={form} onSubmit={handleSubmit} />
            </Card>
        </Spin>
    );
};
