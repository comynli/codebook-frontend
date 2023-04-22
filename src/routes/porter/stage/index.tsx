import { useMap } from "ahooks";
import { Button, Card, Form, Input, Modal, PageHeader, Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import { porterApi } from "~/api";
import { Stage } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { StageView } from "~/views/porter/stage";

export default () => {
    const list = useAsync(porterApi.listStages.bind(porterApi));
    const create = useAsync(porterApi.createStage.bind(porterApi));
    const { paging, pagination, setTotal } = usePagination();
    const [stages, { set, get, remove, reset }] = useMap<number, Stage>();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm<Stage>();

    useEffect(() => {
        list.run({ page: paging.page, size: paging.size });
    }, [paging.page, paging.size]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                setTotal(list.data?.count ?? 0);
                reset();
                list.data?.results?.map((it) => {
                    set(it.id, it);
                });
            });
        }
    }, [list.state]);

    useEffect(() => {
        if (create.state === "COMPLETED") {
            unstable_batchedUpdates(() => {
                if (create.data) {
                    set(create.data.id, create.data);
                }
                form.resetFields();
                setVisible(false);
            });
        }
    }, [create.state]);

    const extra = (
        <Button type={"primary"} onClick={() => setVisible(true)}>
            增加
        </Button>
    );

    const handleSubmit = (request: Stage) => {
        create.run({ stageRequest: request });
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

    const stageIdList = Array.from(stages.keys()).sort((a, b) => (a > b ? 1 : -1));

    const handleStageChange = (id: number, stage?: Stage) => {
        if (stage) {
            set(id, stage);
        } else {
            remove(id);
        }
    };

    return (
        <Spin spinning={list.loading}>
            <PageHeader title={"环境列表"} extra={extra} />
            {stageIdList.map((it) => (
                <StageView stage={get(it)} key={it} onChange={(stage) => handleStageChange(it, stage)} />
            ))}
            <Card style={{ margin: 8 }}>
                <Pagination {...pagination} />
            </Card>
            <Modal open={visible} title={"创建环境"} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name={"name"} label={"名称"} rules={[{ required: true, pattern: /^[a-z0-9-]+$/ }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};
