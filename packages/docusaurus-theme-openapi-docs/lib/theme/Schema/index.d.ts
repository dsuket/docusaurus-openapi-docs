import React from "react";
import { SchemaObject } from "../../types";
interface SchemaProps {
    schema: SchemaObject;
    schemaType: "request" | "response";
}
declare const SchemaNode: React.FC<SchemaProps>;
export default SchemaNode;
