import { Button, Card, Form, FormInstance, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";

import { porterApi } from "~/api";
import { DeploymentUnitCreationRequest, DeploymentUnitMutationRequest } from "~/generated";
import { useAsync } from "~/hooks";

export interface DeploymentUnitFormProps<T extends DeploymentUnitCreationRequest | DeploymentUnitMutationRequest> {
    form: FormInstance<T>;
    onSubmit?: (request: T) => void;
    initValues?: T;
}

export function DeploymentUnitForm<T extends DeploymentUnitCreationRequest | DeploymentUnitMutationRequest>(
    props: DeploymentUnitFormProps<T>,
) {
    const stages = useAsync(porterApi.listStages.bind(porterApi));
    const clusters = useAsync(porterApi.listClusters.bind(porterApi));
    const [laneOptions, setLaneOptions] = useState<{ value: number; label: string }[]>([]);
    const [namespaceOptions, setNamespaceOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        stages.run({ page: 1, size: 100 });
        clusters.run({ page: 1, size: 100 });
    }, []);

    const stageOptions = stages.data?.results?.map?.((it) => ({ value: it.id, label: it.name })) ?? [];
    const clusterOptions = clusters.data?.results?.map?.((it) => ({ value: it.id, label: it.name })) ?? [];

    useEffect(() => {
        if (stages.state === "COMPLETED") {
            console.log(props?.initValues?.stage);
            const options =
                stages.data?.results
                    ?.find((it) => it.id === props.initValues?.stage)
                    ?.laneSet?.map((it) => ({
                        value: it.id,
                        label: it.name,
                    })) ?? [];
            setLaneOptions(options);
        }
    }, [stages.state, props.initValues]);

    const handleChange = (changed: Partial<DeploymentUnitCreationRequest>) => {
        if (changed?.stage) {
            const options =
                stages.data?.results
                    ?.find((it) => it.id === changed?.stage)
                    ?.laneSet?.map((it) => ({
                        value: it.id,
                        label: it.name,
                    })) ?? [];
            setLaneOptions(options);
        }

        if (changed?.cluster) {
            const options =
                clusters.data?.results
                    ?.find((it) => it.id === changed?.cluster)
                    ?.namespaceSet?.map((it) => ({
                        value: it,
                        label: it,
                    })) ?? [];
            setNamespaceOptions(options);
        }
    };

    return (
        <Card style={{ margin: 8 }}>
            <Form form={props.form} labelCol={{ span: 4 }} onFinish={props.onSubmit} onValuesChange={handleChange}>
                <Form.Item name={"name"} label={"名称"} rules={[{ required: true, pattern: /^[a-z0-9-]+$/ }]}>
                    <Input />
                </Form.Item>

                <Form.Item name={["stage"]} label={"环境"} rules={[{ required: true }]}>
                    <Select options={stageOptions} />
                </Form.Item>
                <Form.Item name={["lane"]} label={"泳道"} rules={[{ required: true }]}>
                    <Select options={laneOptions} />
                </Form.Item>
                <Form.Item name={["cluster"]} label={"集群"} rules={[{ required: true }]}>
                    <Select options={clusterOptions} />
                </Form.Item>
                <Form.Item name={"namespace"} label={"namespace"} rules={[{ required: true }]}>
                    <Select options={namespaceOptions} />
                </Form.Item>
                <Form.Item name={"progressDeadline"} label={"进度期限"} rules={[{ required: true }]} initialValue={600}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name={"replicas"} label={"副本数"} rules={[{ required: true }]} initialValue={1}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name={"cpuRequest"} label={"CPU请求"} rules={[{ required: true }]} initialValue={100}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name={"cpuLimit"} label={"CPU限制"} rules={[{ required: true }]} initialValue={1000}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name={"memoryRequest"} label={"内存请求"} rules={[{ required: true }]} initialValue={100}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name={"memoryLimit"} label={"内存限制"} rules={[{ required: true }]} initialValue={1000}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name={"template"} label={"模板"}>
                    <Input.TextArea autoSize={{ minRows: 3 }} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button type={"primary"} htmlType={"submit"}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
