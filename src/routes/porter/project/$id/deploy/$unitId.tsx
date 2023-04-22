import { Button, Card, Descriptions, PageHeader, Spin } from "antd";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";

import { porterApi } from "~/api";
import { DeploymentUnit } from "~/generated";
import { useAsync } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { DeployTasksView } from "~/views/porter/project/deploy/tasks";

export default () => {
    const { unitId } = useParams<"unitId">();
    const { project } = useOutletContext<OutletContext>();
    const get = useAsync(porterApi.getDeploymentUnit.bind(porterApi));
    const [unit, setUnit] = useState<DeploymentUnit>();

    useEffect(() => {
        if (project?.id && unitId) {
            get.run({ id: project.id, unitId });
        }
    }, [project?.id, unitId]);

    useEffect(() => {
        if (get.state === "COMPLETED") {
            setUnit(get.data);
        }
    }, [get.state]);

    return (
        <Spin spinning={get.loading}>
            <PageHeader title={project?.name} subTitle={unit?.name} />
            <Card
                style={{ margin: 8 }}
                extra={
                    <Link to={"edit"}>
                        <Button type={"primary"} size={"middle"} ghost>
                            编辑
                        </Button>
                    </Link>
                }
            >
                <Descriptions column={2} bordered>
                    <Descriptions.Item label={"进度期限"}>{unit?.progressDeadline}</Descriptions.Item>
                    <Descriptions.Item label={"副本数"}>{unit?.replicas}</Descriptions.Item>
                    <Descriptions.Item label={"环境"}>{unit?.stage.name}</Descriptions.Item>
                    <Descriptions.Item label={"泳道"}>{unit?.lane.name}</Descriptions.Item>
                    <Descriptions.Item label={"集群"}>{unit?.cluster.name}</Descriptions.Item>
                    <Descriptions.Item label={"命名空间"}>{unit?.namespace}</Descriptions.Item>
                    <Descriptions.Item label={"CPU请求"}>{unit?.cpuRequest}</Descriptions.Item>
                    <Descriptions.Item label={"CPU限制"}>{unit?.cpuLimit}</Descriptions.Item>
                    <Descriptions.Item label={"内存请求"}>{unit?.memoryRequest}</Descriptions.Item>
                    <Descriptions.Item label={"内存限制"}>{unit?.memoryLimit}</Descriptions.Item>
                </Descriptions>
            </Card>
            <DeployTasksView unit={unit} />
        </Spin>
    );
};
