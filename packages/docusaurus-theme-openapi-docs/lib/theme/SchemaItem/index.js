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
exports.default = SchemaItem;
const react_1 = __importDefault(require("react"));
const Markdown_1 = __importDefault(require("@theme/Markdown"));
const SchemaTabs_1 = __importDefault(require("@theme/SchemaTabs"));
const TabItem_1 = __importDefault(require("@theme/TabItem"));
const clsx_1 = __importDefault(require("clsx"));
const utils_1 = require("../../markdown/utils");
const transformEnumDescriptions = (enumDescriptions) => {
  if (enumDescriptions) {
    return Object.entries(enumDescriptions);
  }
  return [];
};
const getEnumDescriptionMarkdown = (enumDescriptions) => {
  if (enumDescriptions?.length) {
    return `| Enum Value | Description |
| ---- | ----- |
${enumDescriptions
  .map((desc) => {
    return `| ${desc[0]} | ${desc[1]} | `.replaceAll("\n", "<br/>");
  })
  .join("\n")}
    `;
  }
  return "";
};
function SchemaItem(props) {
  const {
    children: collapsibleSchemaContent,
    collapsible,
    name,
    qualifierMessage,
    required,
    schemaName,
    schema,
  } = props;
  let deprecated;
  let schemaDescription;
  let defaultValue;
  let example;
  let examples;
  let nullable;
  let enumDescriptions = [];
  let constValue;
  if (schema) {
    deprecated = schema.deprecated;
    schemaDescription = schema.description;
    enumDescriptions = transformEnumDescriptions(schema["x-enumDescriptions"]);
    defaultValue = schema.default;
    example = schema.example;
    examples = schema.examples;
    nullable =
      schema.nullable ||
      (Array.isArray(schema.type) && schema.type.includes("null")); // support JSON Schema nullable
    constValue = schema.const;
  }
  const renderRequired = (0, utils_1.guard)(
    Array.isArray(required) ? required.includes(name) : required,
    () =>
      react_1.default.createElement(
        "span",
        { className: "openapi-schema__required" },
        "required"
      )
  );
  const renderDeprecated = (0, utils_1.guard)(deprecated, () =>
    react_1.default.createElement(
      "span",
      { className: "openapi-schema__deprecated" },
      "deprecated"
    )
  );
  const renderNullable = (0, utils_1.guard)(nullable, () =>
    react_1.default.createElement(
      "span",
      { className: "openapi-schema__nullable" },
      "nullable"
    )
  );
  const renderEnumDescriptions = (0, utils_1.guard)(
    getEnumDescriptionMarkdown(enumDescriptions),
    (value) => {
      return react_1.default.createElement(
        "div",
        { style: { marginTop: ".5rem" } },
        react_1.default.createElement(Markdown_1.default, null, value)
      );
    }
  );
  const renderSchemaDescription = (0, utils_1.guard)(
    schemaDescription,
    (description) =>
      react_1.default.createElement(
        react_1.default.Fragment,
        null,
        react_1.default.createElement(Markdown_1.default, null, description)
      )
  );
  const renderQualifierMessage = (0, utils_1.guard)(
    qualifierMessage,
    (message) =>
      react_1.default.createElement(
        react_1.default.Fragment,
        null,
        react_1.default.createElement(Markdown_1.default, null, message)
      )
  );
  function renderDefaultValue() {
    if (defaultValue !== undefined) {
      if (typeof defaultValue === "string") {
        return react_1.default.createElement(
          "div",
          null,
          react_1.default.createElement("strong", null, "Default value: "),
          react_1.default.createElement(
            "span",
            null,
            react_1.default.createElement("code", null, defaultValue)
          )
        );
      }
      return react_1.default.createElement(
        "div",
        null,
        react_1.default.createElement("strong", null, "Default value: "),
        react_1.default.createElement(
          "span",
          null,
          react_1.default.createElement(
            "code",
            null,
            JSON.stringify(defaultValue)
          )
        )
      );
    }
    return undefined;
  }
  function renderExample() {
    if (example !== undefined) {
      if (typeof example === "string") {
        return react_1.default.createElement(
          "div",
          null,
          react_1.default.createElement("strong", null, "Example: "),
          react_1.default.createElement(
            "span",
            null,
            react_1.default.createElement("code", null, example)
          )
        );
      }
      return react_1.default.createElement(
        "div",
        null,
        react_1.default.createElement("strong", null, "Example: "),
        react_1.default.createElement(
          "span",
          null,
          react_1.default.createElement("code", null, JSON.stringify(example))
        )
      );
    }
    return undefined;
  }
  // Helper function to format example value
  const formatExample = (example) => {
    if (typeof example === "object" && example !== null) {
      return JSON.stringify(example);
    }
    return String(example);
  };
  function renderExamples() {
    if (examples && examples.length > 0) {
      // If there's only one example, display it without tabs
      if (examples.length === 1) {
        return react_1.default.createElement(
          "div",
          null,
          react_1.default.createElement("strong", null, "Example: "),
          react_1.default.createElement(
            "span",
            null,
            react_1.default.createElement(
              "code",
              null,
              formatExample(examples[0])
            )
          )
        );
      }
      // Multiple examples - use tabs
      return react_1.default.createElement(
        "div",
        null,
        react_1.default.createElement("strong", null, "Examples:"),
        react_1.default.createElement(
          SchemaTabs_1.default,
          null,
          examples.map((example, index) =>
            // @ts-ignore
            react_1.default.createElement(
              TabItem_1.default,
              {
                value: `Example ${index + 1}`,
                label: `Example ${index + 1}`,
                key: `Example ${index + 1}`,
              },
              react_1.default.createElement(
                "p",
                null,
                react_1.default.createElement("strong", null, "Example: "),
                react_1.default.createElement(
                  "code",
                  null,
                  formatExample(example)
                )
              )
            )
          )
        )
      );
    }
    return undefined;
  }
  function renderConstValue() {
    if (constValue !== undefined) {
      if (typeof constValue === "string") {
        return react_1.default.createElement(
          "div",
          null,
          react_1.default.createElement("strong", null, "Constant value: "),
          react_1.default.createElement(
            "span",
            null,
            react_1.default.createElement("code", null, constValue)
          )
        );
      }
      return react_1.default.createElement(
        "div",
        null,
        react_1.default.createElement("strong", null, "Constant value: "),
        react_1.default.createElement(
          "span",
          null,
          react_1.default.createElement(
            "code",
            null,
            JSON.stringify(constValue)
          )
        )
      );
    }
    return undefined;
  }
  const schemaContent = react_1.default.createElement(
    "div",
    null,
    react_1.default.createElement(
      "span",
      { className: "openapi-schema__container" },
      react_1.default.createElement(
        "strong",
        {
          className: (0, clsx_1.default)("openapi-schema__property", {
            "openapi-schema__strikethrough": deprecated,
          }),
        },
        name
      ),
      react_1.default.createElement(
        "span",
        { className: "openapi-schema__name" },
        Array.isArray(schemaName) ? schemaName.join(" | ") : schemaName
      ),
      (nullable || required || deprecated) &&
        react_1.default.createElement("span", {
          className: "openapi-schema__divider",
        }),
      renderNullable,
      renderRequired,
      renderDeprecated
    ),
    renderSchemaDescription,
    renderEnumDescriptions,
    renderQualifierMessage,
    renderConstValue(),
    renderDefaultValue(),
    renderExample(),
    renderExamples(),
    collapsibleSchemaContent ?? collapsibleSchemaContent
  );
  return react_1.default.createElement(
    "div",
    { className: "openapi-schema__list-item" },
    collapsible ? collapsibleSchemaContent : schemaContent
  );
}
