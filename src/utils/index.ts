import dayjs from "dayjs";

import { Authorization } from "~/generated";

export const tokenIsValid = (authorization?: Authorization): boolean => {
    if (!authorization) {
        return false;
    }
    if (!authorization.token) {
        return false;
    }
    if (!authorization.expiredAt) {
        return false;
    }

    return dayjs(authorization.expiredAt).isAfter(dayjs());
};

export const gotoLogin = () => {
    const next = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const target = `/login?next=${encodeURIComponent(next)}`;
    window.location.replace(target);
};

export const dateFormat = (value?: string | Date): string | undefined => {
    if (value) {
        return dayjs(value).format("YYYY-MM-DD hh:mm:ss");
    }
};
