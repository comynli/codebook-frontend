import { Button, Card, Input, Modal, PageHeader, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

import { porterApi } from "~/api";
import { Commit } from "~/generated";
import { useAsync, usePagination } from "~/hooks";
import { OutletContext } from "~/routes/porter/project/$id/models";
import { dateFormat } from "~/utils";

export default () => {
    const { project } = useOutletContext<OutletContext>();
    const list = useAsync(porterApi.listProjectCommits.bind(porterApi));
    const create = useAsync(porterApi.createBuildTask.bind(porterApi));
    const { paging, setTotal, pagination } = usePagination();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [version, setVersion] = useState<string>();
    const [sha, setSha] = useState<string>();

    useEffect(() => {
        if (project?.id) {
            list.run({ id: project.id, page: paging.page, size: paging.size });
        }
    }, [project?.id, paging.size, paging.page]);

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setTotal(list.data?.count ?? 0);
        }
    }, [list.state]);

    useEffect(() => {
        if (create.state === "COMPLETED") {
            setVisible(false);
            navigate(`../${create.data?.id}`);
        }
    }, [create.state]);

    const handleCreate = (sha: string) => {
        setSha(sha);
        setVisible(true);
    };

    const handleSubmit = () => {
        if (project?.id && version && sha) {
            create.run({ id: project.id, buildTaskCreationRequest: { version, commitSha: sha } });
        }
    };

    const columns = [
        {
            title: "hash",
            dataIndex: "sha",
            key: "sha",
            render: (hash: string, r: Commit) => (
                <a href={r.url} target={"_blank"} rel="noreferrer">
                    {hash.substring(0, 7)}
                </a>
            ),
        },
        { title: "消息", dataIndex: "message", key: "message" },
        { title: "贡献者", dataIndex: "committerName", key: "committer" },
        { title: "提交时间", dataIndex: "committedAt", key: "committedAt", render: dateFormat },
        {
            title: "",
            dataIndex: "sha",
            key: "op",
            render: (sha: string) => (
                <Button type={"primary"} size={"small"} onClick={() => handleCreate(sha)} danger>
                    构建
                </Button>
            ),
        },
    ];

    return (
        <Spin spinning={list.loading || create.loading}>
            <PageHeader title={"创建构建任务"} />
            <Card style={{ margin: 8 }}>
                <Table columns={columns} dataSource={list.data?.results} pagination={pagination} rowKey={"sha"} />
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
