import { useState } from "react";

export type AsyncState = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export interface UseAsyncOptions<A, R> {
    OnBefore?: (arg: A) => void;
    OnCompleted?: (res: R) => void;
    OnFailed?: (err: Error) => void;
    OnFinally?: (res?: R, err?: Error) => void;
}

export function useAsync<A, R>(service: (arg: A) => Promise<R>, options?: UseAsyncOptions<A, R>) {
    const [data, setData] = useState<R>();
    const [err, setErr] = useState<Error>();
    const [state, setState] = useState<AsyncState>("PENDING");
    const [loading, setLoading] = useState(false);
    const opts = options ?? {};

    const run = (arg: A) => {
        setLoading(true);
        opts.OnBefore?.(arg);
        setState("RUNNING");
        service(arg)
            .then((res) => {
                opts.OnCompleted?.(res);
                setData(res);
                setState("COMPLETED");
            })
            .catch((e: Error) => {
                opts.OnFailed?.(e);
                setErr(e);
                setState("FAILED");
            })
            .finally(() => {
                opts.OnFinally?.(data, err);
                setLoading(false);
            });
    };

    return {
        run,
        loading,
        state,
        data,
        err,
    };
}
