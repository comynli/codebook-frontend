import { Tag } from "antd";

export interface BooleanTagProps {
    value?: boolean;
}

export function BooleanTag(props: BooleanTagProps) {
    return props.value ? <Tag color={"success"}>是</Tag> : <Tag color={"error"}>否</Tag>;
}
