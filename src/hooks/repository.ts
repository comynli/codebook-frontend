import { SelectProps } from "antd";
import { useEffect, useState } from "react";

import { iacApi } from "~/api";
import { useAsync } from "~/hooks/async";

export const useRepositoriesAsOptions = (id?: number): [SelectProps["options"], (value: string) => void] => {
    const [options, setOptions] = useState<SelectProps["options"]>([]);
    const [kw, setKw] = useState("");
    const list = useAsync(iacApi.listRepositories.bind(iacApi));
    const get = useAsync(iacApi.getRepository.bind(iacApi));

    useEffect(() => {
        if (list.state === "COMPLETED") {
            setOptions(list.data?.results?.map?.((it) => ({ label: it.name, value: it.id })) ?? []);
        }
    }, [list.state]);

    useEffect(() => {
        if (id) {
            get.run({ id });
        }
    }, [id]);

    useEffect(() => {
        if (get.state === "COMPLETED") {
            setOptions([{ label: get.data?.name, value: get.data?.id }]);
        }
        if (get.state === "FAILED") {
            search(kw);
        }
    }, [get.state]);

    useEffect(() => {
        search(kw);
    }, [kw]);

    const search = (kw: string) => {
        list.run({ page: 1, size: 20, kw: kw });
    };

    return [options, setKw];
};
