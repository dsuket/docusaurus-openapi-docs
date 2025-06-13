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
exports.ExampleFromSchema =
  exports.SchemaExamples =
  exports.SchemaExample =
  exports.MimeExamples =
  exports.MimeExample =
    void 0;
exports.json2xml = json2xml;
exports.getLanguageFromMimeType = getLanguageFromMimeType;
const react_1 = __importDefault(require("react"));
const CodeSamples_1 = __importDefault(require("@theme/CodeSamples"));
const Markdown_1 = __importDefault(require("@theme/Markdown"));
const TabItem_1 = __importDefault(require("@theme/TabItem"));
const createSchemaExample_1 = require("docusaurus-plugin-openapi-docs/lib/openapi/createSchemaExample");
const xml_formatter_1 = __importDefault(require("xml-formatter"));
function json2xml(o, tab) {
  const toXml = (v, name, ind) => {
    let xml = "";
    if (v instanceof Array) {
      for (let i = 0, n = v.length; i < n; i++) {
        xml += ind + toXml(v[i], name, ind + "\t") + "\n";
      }
    } else if (typeof v === "object") {
      let hasChild = false;
      xml += ind + "<" + name;
      for (const m in v) {
        if (m.charAt(0) === "@") {
          xml += " " + m.substr(1) + '="' + v[m].toString() + '"';
        } else {
          hasChild = true;
        }
      }
      xml += hasChild ? ">" : "/>";
      if (hasChild) {
        for (const m2 in v) {
          if (m2 === "#text") xml += v[m2];
          else if (m2 === "#cdata") xml += "<![CDATA[" + v[m2] + "]]>";
          else if (m2.charAt(0) !== "@") xml += toXml(v[m2], m2, ind + "\t");
        }
        xml +=
          (xml.charAt(xml.length - 1) === "\n" ? ind : "") + "</" + name + ">";
      }
    } else {
      xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
    }
    return xml;
  };
  let xml = "";
  for (const m3 in o) xml += toXml(o[m3], m3, "");
  return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}
function getLanguageFromMimeType(mimeType) {
  let language = "shell";
  if (mimeType.endsWith("json")) language = "json";
  if (mimeType.endsWith("xml")) language = "xml";
  return language;
}
const MimeExample = ({ example, mimeType }) => {
  const language = getLanguageFromMimeType(mimeType);
  const isObject = typeof example === "object";
  const exampleContent = isObject ? JSON.stringify(example, null, 2) : example;
  return (
    // @ts-ignore
    react_1.default.createElement(
      TabItem_1.default,
      { label: "Example", value: "Example" },
      example.summary &&
        react_1.default.createElement(
          Markdown_1.default,
          { className: "openapi-example__summary" },
          example.summary
        ),
      react_1.default.createElement(CodeSamples_1.default, {
        example: exampleContent,
        language: language,
      })
    )
  );
};
exports.MimeExample = MimeExample;
const MimeExamples = ({ examples, mimeType }) => {
  const language = getLanguageFromMimeType(mimeType);
  // Map examples to an array of TabItem elements
  const examplesArray = Object.entries(examples).map(
    ([exampleName, exampleValue]) => {
      const isObject = typeof exampleValue.value === "object";
      const exampleContent = isObject
        ? JSON.stringify(exampleValue.value, null, 2)
        : exampleValue.value;
      return (
        // @ts-ignore
        react_1.default.createElement(
          TabItem_1.default,
          { label: exampleName, value: exampleName, key: exampleName },
          exampleValue.summary &&
            react_1.default.createElement(
              Markdown_1.default,
              { className: "openapi-example__summary" },
              exampleValue.summary
            ),
          react_1.default.createElement(CodeSamples_1.default, {
            example: exampleContent,
            language: language,
          })
        )
      );
    }
  );
  return examplesArray;
};
exports.MimeExamples = MimeExamples;
const SchemaExample = ({ example, mimeType }) => {
  const language = getLanguageFromMimeType(mimeType);
  const isObject = typeof example === "object";
  const exampleContent = isObject ? JSON.stringify(example, null, 2) : example;
  return (
    // @ts-ignore
    react_1.default.createElement(
      TabItem_1.default,
      { label: "Example", value: "Example" },
      example.summary &&
        react_1.default.createElement(
          Markdown_1.default,
          { className: "openapi-example__summary" },
          example.summary
        ),
      react_1.default.createElement(CodeSamples_1.default, {
        example: exampleContent,
        language: language,
      })
    )
  );
};
exports.SchemaExample = SchemaExample;
const SchemaExamples = ({ examples, mimeType }) => {
  const language = getLanguageFromMimeType(mimeType);
  // Map examples to an array of TabItem elements
  const examplesArray = examples.map((example, i) => {
    const exampleName = `Example ${i + 1}`;
    const isObject = typeof example === "object";
    const exampleContent = isObject
      ? JSON.stringify(example, null, 2)
      : example;
    return (
      // @ts-ignore
      react_1.default.createElement(
        TabItem_1.default,
        { label: exampleName, value: exampleName, key: exampleName },
        react_1.default.createElement(CodeSamples_1.default, {
          example: exampleContent,
          language: language,
        })
      )
    );
  });
  return examplesArray;
};
exports.SchemaExamples = SchemaExamples;
const ExampleFromSchema = ({ schema, mimeType, context }) => {
  const example = (0, createSchemaExample_1.sampleFromSchema)(schema, context);
  if (mimeType.endsWith("xml")) {
    let exampleObject;
    try {
      exampleObject = JSON.parse(JSON.stringify(example));
    } catch {
      return null;
    }
    if (typeof exampleObject === "object") {
      let xmlExample;
      try {
        xmlExample = (0, xml_formatter_1.default)(json2xml(exampleObject, ""), {
          indentation: "  ",
          lineSeparator: "\n",
          collapseContent: true,
        });
      } catch {
        const xmlExampleWithRoot = { root: exampleObject };
        try {
          xmlExample = (0, xml_formatter_1.default)(
            json2xml(xmlExampleWithRoot, ""),
            {
              indentation: "  ",
              lineSeparator: "\n",
              collapseContent: true,
            }
          );
        } catch {
          xmlExample = json2xml(exampleObject, "");
        }
      }
      return (
        // @ts-ignore
        react_1.default.createElement(
          TabItem_1.default,
          { label: "Example (auto)", value: "Example (auto)" },
          react_1.default.createElement(CodeSamples_1.default, {
            example: xmlExample,
            language: "xml",
          })
        )
      );
    }
  }
  if (typeof example === "object" || typeof example === "string") {
    return (
      // @ts-ignore
      react_1.default.createElement(
        TabItem_1.default,
        { label: "Example (auto)", value: "Example (auto)" },
        react_1.default.createElement(CodeSamples_1.default, {
          example: JSON.stringify(example, null, 2),
          language: "json",
        })
      )
    );
  }
  return null;
};
exports.ExampleFromSchema = ExampleFromSchema;
