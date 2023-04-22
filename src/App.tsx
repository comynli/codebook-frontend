import { useLocalStorageState } from "ahooks";
import { ConfigProvider, Layout, Menu } from "antd";
import { useEffect } from "react";
import { Link, useLocation, useRoutes } from "react-router-dom";

import { AUTHORIZATION_STORAGE_KEY } from "~/constants";
import { Authorization } from "~/generated";
import { gotoLogin, tokenIsValid } from "~/utils";

// eslint-disable-next-line import/no-unresolved
import routes from "~react-pages";

export default () => {
    const menus = [
        { key: "iac", label: <Link to={"/iac"}>IaC</Link> },
        { key: "porter", label: <Link to={"/porter"}>应用</Link> },
    ];
    const [authorization] = useLocalStorageState<Authorization>(AUTHORIZATION_STORAGE_KEY);
    const location = useLocation();

    const active = location.pathname.split("/")[1];

    useEffect(() => {
        if (!tokenIsValid(authorization)) {
            const next = location.pathname;
            if (!next.startsWith("/login")) {
                gotoLogin();
            }
        }
    }, [authorization]);

    return (
        <ConfigProvider pageHeader={{ ghost: false }}>
            <Layout>
                <Layout.Header>
                    <div className="logo" />
                    <Menu theme={"dark"} mode={"horizontal"} selectedKeys={[active]} items={menus}></Menu>
                </Layout.Header>
                <Layout style={{ backgroundColor: "#f0f2f5" }}>{useRoutes(routes)}</Layout>
            </Layout>
        </ConfigProvider>
    );
};
