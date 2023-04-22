import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

type State = number;

export const IacTaskState = (props: { state?: State }) => {
    switch (props.state) {
        case 0:
            return (
                <Tag icon={<ClockCircleOutlined />} color="default">
                    PENDING
                </Tag>
            );
        case 1:
            return (
                <Tag icon={<SyncOutlined spin />} color="processing">
                    RUNNING
                </Tag>
            );
        case 2:
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    COMPLETED
                </Tag>
            );
        case 3:
            return (
                <Tag icon={<CloseCircleOutlined />} color="error">
                    FAILED
                </Tag>
            );
        case 4:
            return (
                <Tag icon={<ExclamationCircleOutlined />} color="warning">
                    CANCELED
                </Tag>
            );
        case 5:
            return (
                <Tag icon={<ClockCircleOutlined />} color="error">
                    TIMEOUT
                </Tag>
            );
        case 6:
            return (
                <Tag icon={<SyncOutlined spin />} color="warning">
                    CANCELING
                </Tag>
            );
        default:
            return <></>;
    }
};
