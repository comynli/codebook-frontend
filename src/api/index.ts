import { AUTHORIZATION_STORAGE_KEY } from "~/constants";
import { Authorization, Configuration, IacApi, Middleware, PorterApi, ResponseContext, UserApi } from "~/generated";
import { gotoLogin, tokenIsValid } from "~/utils";

const getToken = () => {
    const data = window.localStorage.getItem(AUTHORIZATION_STORAGE_KEY) ?? "{}";
    const authorization = JSON.parse(data) as Authorization;
    if (tokenIsValid(authorization)) {
        return authorization.token;
    }
    gotoLogin();
    return "";
};

const auth: Middleware = {
    async post(context: ResponseContext): Promise<Response | void> {
        if (context.response.status === 401) {
            window.localStorage.removeItem(AUTHORIZATION_STORAGE_KEY);
            gotoLogin();
            return;
        }
        return context.response;
    },
};

export const authApi = new UserApi(new Configuration({ basePath: "" }));

const configuration = new Configuration({ basePath: "", accessToken: getToken, middleware: [auth] });
export const iacApi = new IacApi(configuration);
export const porterApi = new PorterApi(configuration);
export const userApi = new UserApi(configuration);
