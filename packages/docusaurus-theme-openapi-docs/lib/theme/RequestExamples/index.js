"use strict";
/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleFromSchema =
  exports.RequestSchemaExamples =
  exports.RequestSchemaExample =
  exports.RequestMimeExamples =
  exports.RequestMimeExample =
    void 0;
const Examples_1 = require("@theme/Examples");
Object.defineProperty(exports, "ExampleFromSchema", {
  enumerable: true,
  get: function () {
    return Examples_1.ExampleFromSchema;
  },
});
const RequestMimeExample = ({ example, mimeType }) => {
  return (0, Examples_1.MimeExample)({ example, mimeType });
};
exports.RequestMimeExample = RequestMimeExample;
const RequestMimeExamples = ({ examples, mimeType }) => {
  return (0, Examples_1.MimeExamples)({ examples, mimeType });
};
exports.RequestMimeExamples = RequestMimeExamples;
const RequestSchemaExample = ({ example, mimeType }) => {
  return (0, Examples_1.SchemaExample)({ example, mimeType });
};
exports.RequestSchemaExample = RequestSchemaExample;
const RequestSchemaExamples = ({ examples, mimeType }) => {
  return (0, Examples_1.SchemaExamples)({ examples, mimeType });
};
exports.RequestSchemaExamples = RequestSchemaExamples;
