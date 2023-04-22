import AnsiUp from "ansi_up";
import { Card, Descriptions, PageHeader, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { RunnerEvent, Task } from "~/generated";
import { useWebsocket } from "~/hooks";
import { dateFormat } from "~/utils";
import { IacTaskState } from "~/views/iac/task/state";

const renderer = new AnsiUp();

export default () => {
    const params = useParams<"id">();
    const navigate = useNavigate();
    const [id, setId] = useState<number>();
    const [task, setTask] = useState<Task>();
    const [events, setEvents] = useState<RunnerEvent[]>();
    const { open } = useWebsocket({
        onMessage: (message: string) => {
            const data = JSON.parse(message);
            setTask(data.task);
            setEvents(data.events);
        },
    });

    useEffect(() => {
        if (params.id) {
            const id = Number.parseInt(params.id);
            if (Number.isSafeInteger(id)) {
                setId(id);
            }
        }
    }, [params.id]);

    useEffect(() => {
        if (id && id > 0) {
            let wsUrl = "";
            if (window.location.protocol === "http:") {
                wsUrl = `ws://${window.location.host}/ws/iac/${id}/`;
            } else {
                wsUrl = `wss://${window.location.host}/ws/iac/${id}/`;
            }
            open(wsUrl);
        }
    }, [id]);

    const output = renderer.ansi_to_html(task?.output ?? "");

    const columns = [
        { title: "host", dataIndex: "host", key: "host" },
        { title: "play", dataIndex: "play", key: "play" },
        { title: "task", dataIndex: "taskName", key: "task" },
        { title: "state", dataIndex: "state", key: "state", render: (text: number) => <IacTaskState state={text} /> },
        { title: "start", dataIndex: "start", key: "start", render: dateFormat },
        { title: "end", dataIndex: "end", key: "end", render: dateFormat },
    ];

    return (
        <Spin spinning={false}>
            <PageHeader
                title={task?.repository.name}
                subTitle={task?.commitId}
                tags={[<IacTaskState key="state" state={task?.state} />]}
                onBack={() => navigate("..")}
            />
            <Card style={{ margin: 8 }}>
                <Descriptions bordered>
                    <Descriptions.Item label={"执行人"}>{task?.createdBy?.username}</Descriptions.Item>
                    <Descriptions.Item label={"开始时间"}>{dateFormat(task?.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label={"结束时间"}>{dateFormat(task?.updatedAt)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card style={{ margin: 8 }} title={"Event"}>
                <Table columns={columns} dataSource={events} pagination={false} rowKey={"id"} size={"small"} />
            </Card>
            <Card style={{ margin: 8 }} title={"output"}>
                <pre dangerouslySetInnerHTML={{ __html: output }} />
            </Card>
        </Spin>
    );
};
