import React from "react";
import { ExampleContext } from "docusaurus-plugin-openapi-docs/lib/openapi/createSchemaExample";
export declare function json2xml(o: Record<string, any>, tab: string): string;
export declare function getLanguageFromMimeType(mimeType: string): string;
export interface MimeExampleProps {
    example: any;
    mimeType: string;
}
export declare const MimeExample: React.FC<MimeExampleProps>;
export interface MimeExamplesProps {
    examples: any;
    mimeType: string;
}
export declare const MimeExamples: React.FC<MimeExamplesProps>;
export interface SchemaExampleProps {
    example: any;
    mimeType: string;
}
export declare const SchemaExample: React.FC<SchemaExampleProps>;
export interface SchemaExamplesProps {
    examples: any[];
    mimeType: string;
}
export declare const SchemaExamples: React.FC<SchemaExamplesProps>;
export interface ExampleFromSchemaProps {
    schema: any;
    mimeType: string;
    context: ExampleContext;
}
export declare const ExampleFromSchema: React.FC<ExampleFromSchemaProps>;
