import { SchemaObject } from "./types";
export type ExampleType = "request" | "response";
export interface ExampleContext {
    type: ExampleType;
}
export declare const sampleFromSchema: (schema: SchemaObject | undefined, context: ExampleContext) => any;
