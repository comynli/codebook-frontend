import { Card, Form, PageHeader, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { iacApi } from "~/api";
import { PeriodicTaskMutationRequest } from "~/generated";
import { useAsync } from "~/hooks";
import { PeriodicForm } from "~/views/iac/periodic/form";

export default () => {
    const params = useParams<"id">();
    const get = useAsync(iacApi.getPeriodicTask.bind(iacApi));
    const update = useAsync(iacApi.updatePeriodicTask.bind(iacApi));
    const [id, setId] = useState<number>();
    const [form] = Form.useForm<PeriodicTaskMutationRequest>();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            const id = Number.parseInt(params.id);
            if (Number.isSafeInteger(id) && id > 0) {
                setId(id);
            }
        }
    }, [params.id]);

    useEffect(() => {
        if (id) {
            get.run({ id });
        }
    }, [id]);

    useEffect(() => {
        if (update.state === "COMPLETED") {
            navigate("..");
        }
    }, [update.state]);

    useEffect(() => {
        if (get.state === "COMPLETED" && get.data) {
            const values: PeriodicTaskMutationRequest = {
                periodic: get.data.periodic,
                playbook: get.data.playbook,
                repository: get.data.repository.id,
                envvars: get.data.envvars,
                extravars: get.data.extravars,
                inventories: get.data.inventories,
            };
            form.setFieldsValue(values);
        }
    }, [get.state]);

    const handleSubmit = (request: PeriodicTaskMutationRequest) => {
        if (id) {
            update.run({ id, periodicTaskMutationRequest: request });
        }
    };

    return (
        <Spin spinning={update.loading}>
            <PageHeader title={"创建定时任务"} onBack={() => navigate("..")} />
            <Card style={{ margin: 8 }}>
                <PeriodicForm form={form} onSubmit={handleSubmit} />
            </Card>
        </Spin>
    );
};
