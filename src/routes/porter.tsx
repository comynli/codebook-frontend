import { ClusterOutlined, ProjectOutlined, SubnodeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useMatch } from "react-router";
import { Link, useLocation } from "react-router-dom";

export default () => {
    const items = [
        { key: "project", label: <Link to={"/porter/project"}>我的项目</Link>, icon: <ProjectOutlined /> },
        { key: "stage", label: <Link to={"/porter/stage"}>环境管理</Link>, icon: <SubnodeOutlined /> },
        { key: "cluster", label: <Link to={"/porter/cluster"}>集群管理</Link>, icon: <ClusterOutlined /> },
    ];

    const location = useLocation();
    const active = location.pathname.split("/")[2];
    if (useMatch("/porter/project/:id/*")) {
        return <Outlet />;
    }

    return (
        <Layout style={{ minHeight: "calc( 100vh - 64px)" }}>
            <Layout.Sider theme={"light"}>
                <Menu mode="inline" selectedKeys={[active]} items={items} />
            </Layout.Sider>
            <Layout.Content>
                <Outlet />
            </Layout.Content>
        </Layout>
    );
};
