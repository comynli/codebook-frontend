import { useEffect, useRef, useState } from "react";

export interface UseWebsocketProps {
    url?: string;
    onMessage?: (message: string) => void;
}

export function useWebsocket(props: UseWebsocketProps) {
    const ref = useRef<WebSocket>();
    const [url, setUrl] = useState<string | undefined>(props.url);

    useEffect(() => {
        if (url) {
            const ws = new WebSocket(url);
            ws.onmessage = (ev) => {
                props?.onMessage?.(ev.data);
            };
            ref.current = ws;
        } else {
            ref.current?.close();
        }
        return () => {
            ref.current?.close();
        };
    }, [url]);

    return { instance: ref.current, open: setUrl, close: () => setUrl(undefined) };
}
