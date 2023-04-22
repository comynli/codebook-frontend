import { useDeepCompareEffect } from "ahooks";
import { Button, Card, Divider, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import { porterApi } from "~/api";
import { Lane, Stage } from "~/generated";
import { useAsync } from "~/hooks";
import { dateFormat } from "~/utils";

export interface StageViewProps {
    stage?: Stage;
    onChange?: (stage?: Stage) => void;
}

export const StageView = (props: StageViewProps) => {
    const update = useAsync(porterApi.updateStage.bind(porterApi));
    const remove = useAsync(porterApi.removeStage.bind(porterApi));
    const createLane = useAsync(porterApi.createLane.bind(porterApi));
    const removeLane = useAsync(porterApi.removeLane.bind(porterApi));
    const [stage, setStage] = useState(props.stage);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm<Stage>();
    const [laneVisible, setLaneVisible] = useState(false);
    const [laneForm] = Form.useForm<Lane>();

    useDeepCompareEffect(() => {
        setStage(props.stage);
    }, [props.stage]);

    useEffect(() => {
        if (update.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                if (update.data) {
                    props?.onChange?.(update.data);
                    setStage(update.data);
                    setVisible(false);
                }
            });
        }
    }, [update.state]);

    useEffect(() => {
        if (remove.state === "COMPLETED") {
            props?.onChange?.();
        }
    }, [remove.state]);

    useEffect(() => {
        if (createLane.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                if (createLane.data) {
                    props?.onChange?.(createLane.data);
                    setStage(createLane.data);
                    setLaneVisible(false);
                    laneForm.resetFields();
                }
            });
        }
    }, [createLane.state]);

    useEffect(() => {
        if (removeLane.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                if (removeLane.data) {
                    props?.onChange?.(removeLane.data);
                    setStage(removeLane.data);
                }
            });
        }
    }, [removeLane.state]);

    const handleSubmit = (request: Stage) => {
        if (stage?.id) {
            update.run({ id: stage.id, stageRequest: request });
        }
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        unstable_batchedUpdates(() => {
            form.resetFields();
            setVisible(false);
        });
    };

    const handleUpdate = () => {
        if (stage) {
            unstable_batchedUpdates(() => {
                form.setFieldsValue(stage);
                setVisible(true);
            });
        }
    };

    const handleRemove = () => {
        if (stage) {
            remove.run({ id: stage.id });
        }
    };

    const handleSubmitLane = (request: Lane) => {
        if (stage?.id) {
            createLane.run({ id: stage.id, laneRequest: request });
        }
    };

    const handleRemoveLane = (name: string) => {
        if (stage?.id) {
            removeLane.run({ id: stage.id, name: name });
        }
    };

    const handleLanModalOk = () => {
        laneForm.submit();
    };

    const handleLanModalCancel = () => {
        unstable_batchedUpdates(() => {
            laneForm.resetFields();
            setLaneVisible(false);
        });
    };

    const columns = [
        { title: "泳道", dataIndex: "name", key: "name" },
        { title: "创建时间", dataIndex: "createdAt", key: "createdAt", render: dateFormat },
        { title: "更新时间", dataIndex: "updatedAt", key: "createdAt", render: dateFormat },
        {
            title: "",
            dataIndex: "name",
            key: "op",
            render: (name: string) => (
                <Space>
                    <Popconfirm
                        disabled={name === "default"}
                        title={`您确定要删除泳道${name}吗？`}
                        onConfirm={() => handleRemoveLane(name)}
                    >
                        <Button disabled={name === "default"} size={"small"} type={"primary"} ghost danger>
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const extra = (
        <Space>
            <Button size={"middle"} type={"primary"} ghost onClick={() => setLaneVisible(true)}>
                增加泳道
            </Button>
            <Divider type={"vertical"} />
            <Button size={"middle"} type={"primary"} ghost onClick={handleUpdate}>
                修改
            </Button>
            <Popconfirm title={`您确定要删除环境${stage?.name}吗？`} onConfirm={handleRemove}>
                <Button size={"middle"} type={"primary"} ghost danger>
                    删除
                </Button>
            </Popconfirm>
        </Space>
    );

    return (
        <Card title={stage?.name} style={{ margin: 8 }} extra={extra}>
            <Table columns={columns} dataSource={stage?.laneSet} pagination={false} rowKey={"name"}></Table>
            <Modal open={visible} title={"修改环境"} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name={"name"} label={"名称"} rules={[{ required: true, pattern: /^[a-z0-9-]+$/ }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal open={laneVisible} title={"创建泳道"} onOk={handleLanModalOk} onCancel={handleLanModalCancel}>
                <Form form={laneForm} onFinish={handleSubmitLane}>
                    <Form.Item name={"name"} label={"名称"} rules={[{ required: true, pattern: /^[a-z0-9-]+$/ }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};
