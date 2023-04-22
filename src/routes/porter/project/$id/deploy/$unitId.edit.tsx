import { Form, PageHeader, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";

import { porterApi } from "~/api";
import { DeploymentUnitMutationRequest } from "~/generated";
import { useAsync } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { DeploymentUnitForm } from "~/views/porter/project/deploy/unit";

export default () => {
    const params = useParams<"unitId">();
    const { project } = useOutletContext<OutletContext>();
    const get = useAsync(porterApi.getDeploymentUnit.bind(porterApi));
    const [form] = Form.useForm<DeploymentUnitMutationRequest>();
    const navigate = useNavigate();
    const update = useAsync(porterApi.updateDeploymentUnit.bind(porterApi));

    useEffect(() => {
        if (project?.id && params.unitId) {
            get.run({ id: project.id, unitId: params.unitId });
        }
    }, [project?.id, params.unitId]);

    useEffect(() => {
        if (get.state === "COMPLETED" && get.data) {
            form.setFieldsValue({
                ...get.data,
                stage: get.data.stage.id,
                lane: get.data.lane.id,
                cluster: get.data.cluster.id,
            });
        }
    }, [get.state]);

    useEffect(() => {
        if (update.state === "COMPLETED" && update.data?.id) {
            navigate("..");
        }
    }, [update.state]);

    const handleSubmit = (request: DeploymentUnitMutationRequest) => {
        if (project?.id && params.unitId) {
            update.run({ deploymentUnitMutationRequest: request, id: project.id, unitId: params.unitId });
        }
    };

    return (
        <Spin spinning={update.loading}>
            <PageHeader title={"修改部署单元"} />
            <DeploymentUnitForm
                form={form}
                onSubmit={handleSubmit}
                initValues={{
                    ...get.data,
                    stage: get.data?.stage.id,
                    lane: get.data?.lane.id,
                    cluster: get.data?.cluster.id,
                }}
            />
        </Spin>
    );
};
