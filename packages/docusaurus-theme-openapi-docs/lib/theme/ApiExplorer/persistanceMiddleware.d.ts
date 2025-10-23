import { Middleware } from "@reduxjs/toolkit";
import { ThemeConfig } from "docusaurus-theme-openapi-docs/src/types";
export declare function createPersistanceMiddleware(options: ThemeConfig["api"]): Middleware<{}, {
    accept: import("./Accept/slice").State;
    contentType: import("./ContentType/slice").State;
    response: import("./Response/slice").State;
    server: import("./Server/slice").State;
    body: import("./Body/slice").FormBody | import("./Body/slice").RawBody | import("./Body/slice").EmptyBody;
    params: import("./ParamOptions/slice").State;
    auth: import("@theme/ApiExplorer/Authorization/slice").AuthState;
}, import("redux-thunk").ThunkDispatch<{
    accept: import("./Accept/slice").State;
    contentType: import("./ContentType/slice").State;
    response: import("./Response/slice").State;
    server: import("./Server/slice").State;
    body: import("./Body/slice").FormBody | import("./Body/slice").RawBody | import("./Body/slice").EmptyBody;
    params: import("./ParamOptions/slice").State;
    auth: import("@theme/ApiExplorer/Authorization/slice").AuthState;
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>>;
