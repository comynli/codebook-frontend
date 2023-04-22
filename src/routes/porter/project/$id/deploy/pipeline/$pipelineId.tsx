import { Button, Card, Descriptions, PageHeader, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";

import { porterApi } from "~/api";
import { Pipeline } from "~/generated";
import { useAsync } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { cancelable, finalized, TaskState } from "~/views/state";

export default () => {
    const { project } = useOutletContext<OutletContext>();
    const { pipelineId } = useParams<"pipelineId">();
    const get = useAsync(porterApi.getPipeline.bind(porterApi));
    const actions = useAsync(porterApi.getPipelineNextActions.bind(porterApi));
    const execute = useAsync(porterApi.executePipeline.bind(porterApi));
    const close = useAsync(porterApi.closePipeline.bind(porterApi));
    const [pipeline, setPipeline] = useState<Pipeline>();

    useEffect(() => {
        if (project?.id && pipelineId) {
            get.run({ id: project.id, pipelineId });
            actions.run({ id: project.id, pipelineId });
        }
    }, [project?.id, pipelineId]);

    useEffect(() => {
        if (get.state === "COMPLETED") {
            setPipeline(get.data);
        }
    }, [get.state]);

    useEffect(() => {
        if (execute.state === "COMPLETED") {
            setPipeline(execute.data);
        }
    }, [execute.state]);

    useEffect(() => {
        if (close.state === "COMPLETED") {
            setPipeline(close.data);
        }
    }, [close.state]);

    useEffect(() => {
        if (pipeline?.current && !finalized.has(pipeline.current.state ?? 0)) {
            const timer = setTimeout(() => {
                if (project?.id && pipelineId) {
                    get.run({ id: project.id, pipelineId });
                    actions.run({ id: project.id, pipelineId });
                }
            }, 3 * 1000);
            return () => clearTimeout(timer);
        }
    }, [pipeline?.current]);

    const columns = [
        { title: "环境", dataIndex: "stage", key: "stage" },
        { title: "泳道", dataIndex: "lane", key: "lane" },
        { title: "集群", dataIndex: "cluster", key: "cluster" },
        { title: "命名空间", dataIndex: "namespace", key: "namespace" },
        {
            title: "",
            dataIndex: "id",
            key: "op",
            render: (id: number) => (
                <Button
                    disabled={pipeline?.closed}
                    type={"primary"}
                    size={"small"}
                    onClick={() => handleExecute(id)}
                    danger
                >
                    发布
                </Button>
            ),
        },
    ];

    const handleExecute = (unit?: number) => {
        if (pipeline?.id && project?.id) {
            execute.run({ pipelineId: pipeline.id.toString(), id: project?.id, unit: unit });
        }
    };

    const handleClose = () => {
        if (project?.id && pipelineId) {
            close.run({ id: project.id, pipelineId });
        }
    };

    return (
        <Spin spinning={get.loading}>
            <PageHeader
                title={project?.name}
                subTitle={pipeline?.version}
                extra={
                    <Button
                        onClick={handleClose}
                        disabled={
                            pipeline?.closed || (pipeline?.current && cancelable.has(pipeline?.current?.state ?? 0))
                        }
                        type={"primary"}
                        ghost
                        danger
                    >
                        关闭
                    </Button>
                }
            />
            {pipeline?.current && (
                <Card
                    style={{ margin: 8 }}
                    title={"当前步骤"}
                    extra={
                        <Button
                            disabled={pipeline.closed}
                            onClick={() => handleExecute()}
                            type={"primary"}
                            size={"middle"}
                            danger
                            ghost
                        >
                            重新执行
                        </Button>
                    }
                >
                    <Descriptions column={3} bordered>
                        <Descriptions.Item label={"环境"}>{pipeline.current.deploymentUnit.stage}</Descriptions.Item>
                        <Descriptions.Item label={"泳道"}>{pipeline.current.deploymentUnit.lane}</Descriptions.Item>
                        <Descriptions.Item label={"状态"}>
                            <TaskState state={pipeline.current.state} />
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            )}
            {actions.data?.results && actions.data.results.length > 0 && (
                <Card loading={actions.loading} style={{ margin: 8 }} title={"下一步"}>
                    <Table columns={columns} dataSource={actions.data?.results} rowKey={"id"} pagination={false} />
                </Card>
            )}
        </Spin>
    );
};
