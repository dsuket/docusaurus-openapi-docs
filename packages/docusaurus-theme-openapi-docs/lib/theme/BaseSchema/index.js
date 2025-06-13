"use strict";
/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BrowserOnly_1 = __importDefault(require("@docusaurus/BrowserOnly"));
const Details_1 = __importDefault(require("@theme/Details"));
const Examples_1 = require("@theme/Examples");
const Markdown_1 = __importDefault(require("@theme/Markdown"));
const MimeTabs_1 = __importDefault(require("@theme/MimeTabs"));
const Schema_1 = __importDefault(require("@theme/Schema"));
const SchemaTabs_1 = __importDefault(require("@theme/SchemaTabs"));
const SkeletonLoader_1 = __importDefault(require("@theme/SkeletonLoader"));
const TabItem_1 = __importDefault(require("@theme/TabItem"));
const BaseSchemaComponent = ({ title, body, style, schemaType }) => {
  if (
    body === undefined ||
    body.content === undefined ||
    Object.keys(body).length === 0 ||
    Object.keys(body.content).length === 0
  ) {
    return null;
  }
  const mimeTypes = Object.keys(body.content);
  if (mimeTypes && mimeTypes.length) {
    return react_1.default.createElement(
      MimeTabs_1.default,
      { className: "openapi-tabs__mime", schemaType: schemaType },
      mimeTypes.map((mimeType) => {
        const mimeExamples = body.content[mimeType].examples;
        const mimeExample = body.content[mimeType].example;
        const schemaExamples = body.content[mimeType].schema?.examples;
        const schemaExample = body.content[mimeType].schema?.example;
        const firstBody = body.content[mimeType].schema;
        if (
          firstBody === undefined ||
          (firstBody.properties &&
            Object.keys(firstBody.properties).length === 0)
        ) {
          return null;
        }
        if (firstBody) {
          const tabTitle = "Schema";
          return (
            // @ts-ignore
            react_1.default.createElement(
              TabItem_1.default,
              { key: mimeType, label: mimeType, value: mimeType },
              react_1.default.createElement(
                SchemaTabs_1.default,
                { className: "openapi-tabs__schema" },
                react_1.default.createElement(
                  TabItem_1.default,
                  { key: tabTitle, label: tabTitle, value: tabTitle },
                  react_1.default.createElement(
                    Details_1.default,
                    {
                      className: "openapi-markdown__details mime",
                      "data-collapsed": false,
                      open: true,
                      style: style,
                      summary: react_1.default.createElement(
                        react_1.default.Fragment,
                        null,
                        react_1.default.createElement(
                          "summary",
                          null,
                          react_1.default.createElement(
                            "strong",
                            {
                              className:
                                "openapi-markdown__details-summary-header-body",
                            },
                            title,
                            body.required &&
                              react_1.default.createElement(
                                "strong",
                                { className: "openapi-schema__required" },
                                "required"
                              )
                          )
                        )
                      ),
                    },
                    react_1.default.createElement(
                      "div",
                      { style: { textAlign: "left", marginLeft: "1rem" } },
                      body.description &&
                        react_1.default.createElement(
                          "div",
                          {
                            style: { marginTop: "1rem", marginBottom: "1rem" },
                          },
                          react_1.default.createElement(
                            Markdown_1.default,
                            null,
                            body.description
                          )
                        )
                    ),
                    react_1.default.createElement(
                      "ul",
                      { style: { marginLeft: "1rem" } },
                      react_1.default.createElement(Schema_1.default, {
                        schema: firstBody,
                        schemaType: schemaType,
                      })
                    )
                  )
                ),
                firstBody &&
                  (0, Examples_1.ExampleFromSchema)({
                    schema: firstBody,
                    mimeType,
                    context: { type: schemaType },
                  }),
                mimeExamples &&
                  (0, Examples_1.MimeExamples)({
                    examples: mimeExamples,
                    mimeType,
                  }),
                mimeExample &&
                  (0, Examples_1.MimeExample)({
                    example: mimeExample,
                    mimeType,
                  }),
                schemaExamples &&
                  (0, Examples_1.SchemaExamples)({
                    examples: schemaExamples,
                    mimeType,
                  }),
                schemaExample &&
                  (0, Examples_1.SchemaExample)({
                    example: schemaExample,
                    mimeType,
                  })
              )
            )
          );
        }
        return null;
      })
    );
  }
  return null;
};
const BaseSchema = (props) => {
  return react_1.default.createElement(
    BrowserOnly_1.default,
    {
      fallback: react_1.default.createElement(SkeletonLoader_1.default, {
        size: "sm",
      }),
    },
    () => {
      return react_1.default.createElement(BaseSchemaComponent, { ...props });
    }
  );
};
exports.default = BaseSchema;
