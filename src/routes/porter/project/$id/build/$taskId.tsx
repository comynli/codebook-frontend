import AnsiUp from "ansi_up";
import { Button, Card, Descriptions, Input, Modal, PageHeader, Space, Spin } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import SyntaxHighlighter from "react-syntax-highlighter";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

import { porterApi } from "~/api";
import { BuildTask, BuildTaskFromJSON } from "~/generated";
import { useAsync, useWebsocket } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { dateFormat } from "~/utils";
import { cancelable, finalized, TaskState } from "~/views/state";

const renderer = new AnsiUp();

export default () => {
    const { project } = useOutletContext<OutletContext>();
    const { taskId } = useParams<"taskId">();
    const get = useAsync(porterApi.getBuildTask.bind(porterApi));
    const [visible, setVisible] = useState(false);
    const [version, setVersion] = useState<string>();
    const create = useAsync(porterApi.createBuildTask.bind(porterApi));
    const cancel = useAsync(porterApi.cancelBuildTask.bind(porterApi));
    const navigate = useNavigate();
    const [task, setTask] = useState<BuildTask>();
    const [active, setActive] = useState("logging");

    const { open } = useWebsocket({
        onMessage: (message: string) => {
            const data = JSON.parse(message);
            setTask(BuildTaskFromJSON(data));
        },
    });

    useEffect(() => {
        let wsUrl = "";
        if (window.location.protocol === "http:") {
            wsUrl = `ws://${window.location.host}/ws/porter/build/${taskId}/`;
        } else {
            wsUrl = `wss://${window.location.host}/ws/porter/build/${taskId}/`;
        }
        open(wsUrl);
    }, [taskId]);

    useEffect(() => {
        if (create.state === "COMPLETED") {
            navigate(`../${create.data?.id}`);
            setVisible(false);
        }
    }, [create.state]);

    useEffect(() => {
        if (cancel.state === "COMPLETED") {
            setTask(cancel.data);
        }
    }, [cancel.state]);

    const openModal = () => {
        setVersion("");
        setVisible(true);
    };

    const handleSubmit = () => {
        console.log(project?.id, version, task?.commitSha);
        if (project?.id && version && task?.commitSha) {
            create.run({ id: project.id, buildTaskCreationRequest: { commitSha: task.commitSha, version: version } });
        }
    };

    const handleCancel = () => {
        if (project?.id && taskId) {
            cancel.run({ id: project.id, taskId });
        }
    };

    const extra = (
        <Space>
            <Button type={"primary"} onClick={openModal} disabled={!finalized.has(task?.state ?? 0)} ghost>
                重新构建
            </Button>
            <Button type={"primary"} onClick={handleCancel} disabled={!cancelable.has(task?.state ?? 0)} danger ghost>
                终止构建
            </Button>
        </Space>
    );

    const tabContents: { [key: string]: ReactNode } = {
        logging: <pre dangerouslySetInnerHTML={{ __html: renderer.ansi_to_html(task?.log ?? "") }} />,
        yaml: <SyntaxHighlighter language={yaml}>{task?.yaml ?? ""}</SyntaxHighlighter>,
    };

    const tabs = [
        { key: "logging", tab: "构建日志" },
        { key: "yaml", tab: "YAML" },
    ];

    return (
        <Spin spinning={get.loading}>
            <PageHeader title={"任务详情"} tags={<TaskState state={task?.state ?? 0} />} extra={extra} />
            <Card style={{ margin: 8 }}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label={"版本"}>{task?.version}</Descriptions.Item>
                    <Descriptions.Item label={"commit"}>
                        {task?.commit?.url ? (
                            <a href={task.commit.url} target={"_blank"} rel="noreferrer">
                                {task.commit.sha.substring(0, 7)}
                            </a>
                        ) : (
                            task?.commitSha?.substring(0, 7)
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label={"创建时间"}>{dateFormat(task?.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label={"更新时间"}>{dateFormat(task?.updatedAt)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card style={{ margin: 8 }} tabList={tabs} activeTabKey={active} onTabChange={setActive}>
                {tabContents[active]}
            </Card>
            <Modal
                open={visible}
                title={"版本号"}
                onCancel={() => setVisible(false)}
                onOk={handleSubmit}
                confirmLoading={create.loading}
            >
                <Input value={version} onChange={(e) => setVersion(e.target.value)} />
            </Modal>
        </Spin>
    );
};
