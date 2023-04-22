import { Form, PageHeader, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";

import { porterApi } from "~/api";
import { DeploymentUnitCreationRequest } from "~/generated";
import { useAsync } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { DeploymentUnitForm } from "~/views/porter/project/deploy/unit";

export default () => {
    const { project } = useOutletContext<OutletContext>();
    const create = useAsync(porterApi.createDeploymentUnit.bind(porterApi));
    const [form] = Form.useForm<DeploymentUnitCreationRequest>();
    const navigate = useNavigate();

    useEffect(() => {
        if (create.state === "COMPLETED") {
            if (create.data?.id) {
                navigate(`../${create.data.id}`);
            }
        }
    }, [create.state]);

    const handleSubmit = (request: DeploymentUnitCreationRequest) => {
        if (project?.id) {
            create.run({ deploymentUnitCreationRequest: request, id: project.id });
        }
    };

    return (
        <Spin spinning={create.loading}>
            <PageHeader title={"创建部署单元"} />
            <DeploymentUnitForm form={form} onSubmit={handleSubmit} />
        </Spin>
    );
};
