import { PayloadAction } from "@reduxjs/toolkit";
export interface FileContent {
    type: "file";
    value: {
        src: string;
        content: Blob;
    };
}
export interface StringContent {
    type: "string";
    value?: string;
}
export type Content = FileContent | StringContent | undefined;
export interface FormBody {
    type: "form";
    content: {
        [key: string]: Content;
    };
}
export interface RawBody {
    type: "raw";
    content: Content;
}
export interface EmptyBody {
    type: "empty";
}
export type Body = EmptyBody | FormBody | RawBody;
export type State = Body;
export declare const slice: import("@reduxjs/toolkit").Slice<FormBody | RawBody | EmptyBody, {
    clearRawBody: (_state: import("immer").WritableDraft<FormBody> | import("immer").WritableDraft<RawBody> | import("immer").WritableDraft<EmptyBody>) => {
        type: "empty";
    };
    setStringRawBody: (_state: import("immer").WritableDraft<FormBody> | import("immer").WritableDraft<RawBody> | import("immer").WritableDraft<EmptyBody>, action: PayloadAction<string>) => {
        type: "raw";
        content: {
            type: "string";
            value: string;
        };
    };
    setFileRawBody: (_state: import("immer").WritableDraft<FormBody> | import("immer").WritableDraft<RawBody> | import("immer").WritableDraft<EmptyBody>, action: PayloadAction<FileContent["value"]>) => {
        type: "raw";
        content: {
            type: "file";
            value: {
                src: string;
                content: Blob;
            };
        };
    };
    clearFormBodyKey: (state: import("immer").WritableDraft<FormBody> | import("immer").WritableDraft<RawBody> | import("immer").WritableDraft<EmptyBody>, action: PayloadAction<string>) => void;
    setStringFormBody: (state: import("immer").WritableDraft<FormBody> | import("immer").WritableDraft<RawBody> | import("immer").WritableDraft<EmptyBody>, action: PayloadAction<{
        key: string;
        value: string;
    }>) => import("immer").WritableDraft<FormBody>;
    setFileFormBody: (state: import("immer").WritableDraft<FormBody> | import("immer").WritableDraft<RawBody> | import("immer").WritableDraft<EmptyBody>, action: PayloadAction<{
        key: string;
        value: FileContent["value"];
    }>) => import("immer").WritableDraft<FormBody> | {
        type: "form";
        content: {
            [x: string]: {
                type: "file";
                value: {
                    src: string;
                    content: Blob;
                };
            };
        };
    };
}, "body", "body", import("@reduxjs/toolkit").SliceSelectors<FormBody | RawBody | EmptyBody>>;
export declare const clearRawBody: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"body/clearRawBody">, setStringRawBody: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "body/setStringRawBody">, setFileRawBody: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    src: string;
    content: Blob;
}, "body/setFileRawBody">, clearFormBodyKey: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "body/clearFormBodyKey">, setStringFormBody: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    key: string;
    value: string;
}, "body/setStringFormBody">, setFileFormBody: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    key: string;
    value: FileContent["value"];
}, "body/setFileFormBody">;
declare const _default: import("redux").Reducer<FormBody | RawBody | EmptyBody>;
export default _default;
