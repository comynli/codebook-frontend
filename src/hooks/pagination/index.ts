import useUrlState from "@ahooksjs/use-url-state";
import { PaginationProps } from "antd";
import { useState } from "react";

interface Paging {
    page: number;
    size: number;
}

export interface UsePaginationResult {
    pagination: PaginationProps;
    setTotal: (v: number) => void;
    paging: Paging;
    setPaging: (page?: number, size?: number) => void;
}

export const usePagination = (initialPaging?: Partial<Paging>): UsePaginationResult => {
    const { page = 1, size = 20 } = initialPaging ?? {};
    const [paging, setPaging] = useUrlState<Paging>({ page, size }, { parseOptions: { parseNumbers: true } });
    const [total, setTotal] = useState(0);

    return {
        pagination: {
            total,
            current: paging.page,
            pageSize: paging.size,
            onChange: (page, size) => setPaging({ page, size }),
        },
        setTotal,
        paging: {
            page: paging.page ?? page,
            size: paging.size ?? size,
        },
        setPaging: (p?: number, s?: number) => setPaging({ page: p ?? page, size: s ?? size }),
    };
};
