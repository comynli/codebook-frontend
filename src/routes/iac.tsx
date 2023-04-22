import { BranchesOutlined, ClockCircleOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router";
import { Link, useLocation } from "react-router-dom";

export default () => {
    const items = [
        { key: "repository", label: <Link to={"/iac/repository"}>仓库</Link>, icon: <BranchesOutlined /> },
        { key: "task", label: <Link to={"/iac/task"}>任务</Link>, icon: <ThunderboltOutlined /> },
        { key: "periodic", label: <Link to={"/iac/periodic"}>定时任务</Link>, icon: <ClockCircleOutlined /> },
    ];

    const location = useLocation();
    const active = location.pathname.split("/")[2];

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
