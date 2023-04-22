import { PageHeader } from "antd";
import { useOutletContext } from "react-router";

import { OutletContext } from "~/routes/porter/project/$id/models";
import { BuildSettingView } from "~/views/porter/project/build/setting";
import { DeploymentUnitListView } from "~/views/porter/project/deploy/units";
import { ProjectMemberView } from "~/views/porter/project/member";

export default () => {
    const { project } = useOutletContext<OutletContext>();

    return (
        <>
            <PageHeader title={project?.name} />
            <ProjectMemberView project={project} />
            <BuildSettingView project={project} />
            <DeploymentUnitListView project={project} />
        </>
    );
};
