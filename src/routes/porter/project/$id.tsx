import { AppstoreOutlined, CiOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Layout, Menu, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";

import { porterApi } from "~/api";
import { Project } from "~/generated";
import { useAsync } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";

export default () => {
    const get = useAsync(porterApi.getProject.bind(porterApi));
    const params = useParams<"id">();
    const [project, setProject] = useState<Project>();
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (params.id) {
            const id = Number.parseInt(params.id);
            if (id > 0) {
                get.run({ id });
            }
        }
    }, [params.id, refresh]);

    useEffect(() => {
        if (get.state === "COMPLETED" && get.data) {
            setProject(get.data);
        }
    }, [get.state]);

    const items = [
        { key: "overview", label: <Link to={"overview"}>概览</Link>, icon: <AppstoreOutlined /> },
        { key: "build", label: <Link to={"build"}>构建</Link>, icon: <CiOutlined /> },
        { key: "deploy", label: <Link to={"deploy"}>发布</Link>, icon: <CloudUploadOutlined /> },
    ];

    const location = useLocation();
    const active = location.pathname.split("/")[4];
    const context: OutletContext = {
        project,
        refresh: () => setRefresh(dayjs().unix()),
    };

    return (
        <Spin spinning={get.loading}>
            <Layout style={{ minHeight: "calc( 100vh - 64px)" }}>
                <Layout.Sider theme={"light"}>
                    <Menu mode="inline" selectedKeys={[active]} items={items} />
                </Layout.Sider>
                <Layout.Content>
                    <Outlet context={context} />
                </Layout.Content>
            </Layout>
        </Spin>
    );
};
