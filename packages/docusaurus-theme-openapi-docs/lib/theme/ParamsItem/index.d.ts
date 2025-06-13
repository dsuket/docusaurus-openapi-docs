import React from "react";
interface Map<T> {
    [key: string]: T;
}
export interface ExampleObject {
    summary?: string | null;
    description?: string | null;
    value?: any;
    externalValue?: string | null;
}
export interface Props {
    className: string;
    param: {
        description: string;
        example: any;
        examples: Map<ExampleObject> | any[];
        name: string;
        required: boolean;
        deprecated: boolean;
        schema: any;
        enumDescriptions?: [string, string][];
    };
}
declare function ParamsItem({ param, ...rest }: Props): React.JSX.Element;
export default ParamsItem;
