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
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const postman_collection_1 = __importDefault(require("postman-collection"));
function setQueryParams(postman, queryParams) {
  postman.url.query.clear();
  const qp = queryParams
    .map((param) => {
      if (!param.value) {
        return undefined;
      }
      // Handle array values
      if (Array.isArray(param.value)) {
        if (param.style === "spaceDelimited") {
          return new postman_collection_1.default.QueryParam({
            key: param.name,
            value: param.value.join(" "),
          });
        } else if (param.style === "pipeDelimited") {
          return new postman_collection_1.default.QueryParam({
            key: param.name,
            value: param.value.join("|"),
          });
        } else if (param.explode) {
          return param.value.map(
            (val) =>
              new postman_collection_1.default.QueryParam({
                key: param.name,
                value: val,
              })
          );
        } else {
          return new postman_collection_1.default.QueryParam({
            key: param.name,
            value: param.value.join(","),
          });
        }
      }
      const decodedValue = decodeURI(param.value);
      const tryJson = () => {
        try {
          return JSON.parse(decodedValue);
        } catch (e) {
          return false;
        }
      };
      const jsonResult = tryJson();
      // Handle object values
      if (jsonResult && typeof jsonResult === "object") {
        if (param.style === "deepObject") {
          return Object.entries(jsonResult).map(
            ([key, val]) =>
              new postman_collection_1.default.QueryParam({
                key: `${param.name}[${key}]`,
                value: val,
              })
          );
        } else if (param.explode) {
          return Object.entries(jsonResult).map(
            ([key, val]) =>
              new postman_collection_1.default.QueryParam({
                key: key,
                value: val,
              })
          );
        } else {
          return new postman_collection_1.default.QueryParam({
            key: param.name,
            value: Object.entries(jsonResult)
              .map(([key, val]) => `${key},${val}`)
              .join(","),
          });
        }
      }
      // Handle boolean values
      if (typeof decodedValue === "boolean") {
        return new postman_collection_1.default.QueryParam({
          key: param.name,
          value: decodedValue ? "true" : "false",
        });
      }
      // Parameter allows empty value: "/hello?extended"
      if (param.allowEmptyValue) {
        if (decodedValue === "true") {
          return new postman_collection_1.default.QueryParam({
            key: param.name,
            value: null,
          });
        }
        return undefined;
      }
      return new postman_collection_1.default.QueryParam({
        key: param.name,
        value: param.value,
      });
    })
    .flat() // Flatten the array in case of nested arrays from map
    .filter((item) => item !== undefined);
  if (qp.length > 0) {
    postman.addQueryParams(qp);
  }
}
function setPathParams(postman, pathParams) {
  // Map through the path parameters
  const source = pathParams.map((param) => {
    if (!param.value) {
      return undefined;
    }
    let serializedValue;
    // Handle different styles
    if (Array.isArray(param.value)) {
      if (param.style === "label") {
        serializedValue = `.${param.value.join(".")}`;
      } else if (param.style === "matrix") {
        serializedValue = `;${param.name}=${param.value.join(";")}`;
      } else {
        serializedValue = param.value.join(",");
      }
      return new postman_collection_1.default.Variable({
        key: param.name,
        value: serializedValue,
      });
    }
    const decodedValue = decodeURI(param.value);
    const tryJson = () => {
      try {
        return JSON.parse(decodedValue);
      } catch (e) {
        return false;
      }
    };
    const jsonResult = tryJson();
    if (typeof jsonResult === "object") {
      if (param.style === "matrix") {
        serializedValue = Object.entries(jsonResult)
          .map(([key, val]) => `;${key}=${val}`)
          .join("");
      } else {
        serializedValue = Object.entries(jsonResult)
          .map(([key, val]) => `${key}=${val}`)
          .join(",");
      }
    } else {
      serializedValue = decodedValue || `:${param.name}`;
    }
    return new postman_collection_1.default.Variable({
      key: param.name,
      value: serializedValue,
    });
  });
  postman.url.variables.assimilate(source, false);
}
function buildCookie(cookieParams) {
  const cookies = cookieParams
    .map((param) => {
      if (param.value) {
        const decodedValue = decodeURI(param.value);
        const tryJson = () => {
          try {
            return JSON.parse(decodedValue);
          } catch (e) {
            return false;
          }
        };
        const jsonResult = tryJson();
        if (typeof jsonResult === "object") {
          if (param.style === "form") {
            // Handle form style
            if (param.explode) {
              // Serialize each key-value pair as a separate cookie
              return Object.entries(jsonResult).map(
                ([key, val]) =>
                  new postman_collection_1.default.Cookie({
                    key: key,
                    value: val,
                  })
              );
            } else {
              // Serialize the object as a single cookie with key-value pairs joined by commas
              return new postman_collection_1.default.Cookie({
                key: param.name,
                value: Object.entries(jsonResult)
                  .map(([key, val]) => `${key},${val}`)
                  .join(","),
              });
            }
          }
        } else {
          // Handle scalar values
          return new postman_collection_1.default.Cookie({
            key: param.name,
            value: param.value,
          });
        }
      }
      return undefined;
    })
    .flat() // Flatten the array in case of nested arrays from map
    .filter((item) => item !== undefined);
  const list = new postman_collection_1.default.CookieList(null, cookies);
  return list.toString();
}
function setHeaders(postman, contentType, accept, cookie, headerParams, other) {
  postman.headers.clear();
  if (contentType) {
    postman.addHeader({ key: "Content-Type", value: contentType });
  }
  if (accept) {
    postman.addHeader({ key: "Accept", value: accept });
  }
  headerParams.forEach((param) => {
    if (param.value) {
      const decodedValue = decodeURI(param.value);
      const tryJson = () => {
        try {
          return JSON.parse(decodedValue);
        } catch (e) {
          return false;
        }
      };
      const jsonResult = tryJson();
      if (Array.isArray(param.value)) {
        if (param.style === "simple") {
          if (param.explode) {
            // Each item in the array is a separate header
            jsonResult.forEach((val) => {
              postman.addHeader({ key: param.name, value: val });
            });
          } else {
            // Array values are joined by commas
            postman.addHeader({
              key: param.name,
              value: param.value.join(","),
            });
          }
        }
      } else if (typeof jsonResult === "object") {
        if (param.style === "simple") {
          if (param.explode) {
            // Each key-value pair in the object is a separate header
            Object.entries(jsonResult).forEach(([key, val]) => {
              postman.addHeader({ key: param.name, value: `${key}=${val}` });
            });
          } else {
            // Object is serialized as a single header with key-value pairs joined by commas
            postman.addHeader({
              key: param.name,
              value: Object.entries(jsonResult)
                .map(([key, val]) => `${key},${val}`)
                .join(","),
            });
          }
        }
      } else {
        // Handle scalar values
        postman.addHeader({ key: param.name, value: param.value });
      }
    }
  });
  other.forEach((header) => {
    postman.addHeader(header);
  });
  if (cookie) {
    postman.addHeader({ key: "Cookie", value: cookie });
  }
}
// TODO: this is all a bit hacky
function setBody(clonedPostman, body) {
  if (clonedPostman.body === undefined) {
    return;
  }
  if (body.type === "empty") {
    clonedPostman.body = undefined;
    return;
  }
  if (body.type === "raw" && body.content?.type === "file") {
    // treat it like file.
    clonedPostman.body.mode = "file";
    clonedPostman.body.file = { src: body.content.value.src };
    return;
  }
  switch (clonedPostman.body.mode) {
    case "raw": {
      // check file even though it should already be set from above
      if (body.type !== "raw" || body.content?.type === "file") {
        clonedPostman.body = undefined;
        return;
      }
      clonedPostman.body.raw = body.content?.value ?? "";
      return;
    }
    case "formdata": {
      clonedPostman.body.formdata?.clear();
      if (body.type !== "form") {
        // treat it like raw.
        clonedPostman.body.mode = "raw";
        clonedPostman.body.raw = `${body.content?.value}`;
        return;
      }
      const params = Object.entries(body.content)
        .filter((entry) => !!entry[1])
        .map(([key, content]) => {
          if (content.type === "file") {
            return new postman_collection_1.default.FormParam({
              key: key,
              ...content,
            });
          }
          return new postman_collection_1.default.FormParam({
            key: key,
            value: content.value,
          });
        });
      clonedPostman.body.formdata?.assimilate(params, false);
      return;
    }
    case "urlencoded": {
      clonedPostman.body.urlencoded?.clear();
      if (body.type !== "form") {
        // treat it like raw.
        clonedPostman.body.mode = "raw";
        clonedPostman.body.raw = `${body.content?.value}`;
        return;
      }
      const params = Object.entries(body.content)
        .filter((entry) => !!entry[1])
        .map(([key, content]) => {
          if (content.type !== "file" && content.value) {
            return new postman_collection_1.default.QueryParam({
              key: key,
              value: content.value,
            });
          }
          return undefined;
        })
        .filter((item) => item !== undefined);
      clonedPostman.body.urlencoded?.assimilate(params, false);
      return;
    }
    default:
      return;
  }
}
function buildPostmanRequest(
  postman,
  {
    queryParams,
    pathParams,
    cookieParams,
    contentType,
    accept,
    headerParams,
    body,
    server,
    auth,
  }
) {
  const clonedPostman = (0, cloneDeep_1.default)(postman);
  clonedPostman.url.protocol = undefined;
  clonedPostman.url.host = [window.location.origin];
  if (server) {
    let url = server.url.replace(/\/$/, "");
    const variables = server.variables;
    if (variables) {
      Object.keys(variables).forEach((variable) => {
        url = url.replace(`{${variable}}`, variables[variable].default);
      });
    }
    clonedPostman.url.host = [url];
  }
  setQueryParams(clonedPostman, queryParams);
  setPathParams(clonedPostman, pathParams);
  const cookie = buildCookie(cookieParams);
  let otherHeaders = [];
  let selectedAuth = [];
  if (auth.selected !== undefined) {
    selectedAuth = auth.options[auth.selected];
  }
  for (const a of selectedAuth) {
    // Bearer Auth
    if (a.type === "http" && a.scheme === "bearer") {
      const { token } = auth.data[a.key];
      if (token === undefined) {
        otherHeaders.push({
          key: "Authorization",
          value: "Bearer <TOKEN>",
        });
        continue;
      }
      otherHeaders.push({
        key: "Authorization",
        value: `Bearer ${token}`,
      });
      continue;
    }
    if (a.type === "oauth2") {
      let token;
      if (auth.data[a.key]) {
        token = auth.data[a.key].token;
      }
      if (token === undefined) {
        otherHeaders.push({
          key: "Authorization",
          value: "Bearer <TOKEN>",
        });
        continue;
      }
      otherHeaders.push({
        key: "Authorization",
        value: `Bearer ${token}`,
      });
      continue;
    }
    // Basic Auth
    if (a.type === "http" && a.scheme === "basic") {
      const { username, password } = auth.data[a.key];
      if (username === undefined || password === undefined) {
        continue;
      }
      otherHeaders.push({
        key: "Authorization",
        value: `Basic ${window.btoa(`${username}:${password}`)}`,
      });
      continue;
    }
    // API Key
    if (a.type === "apiKey" && a.in === "header") {
      const { apiKey } = auth.data[a.key];
      if (apiKey === undefined) {
        otherHeaders.push({
          key: a.name,
          value: `<${a.name ?? a.type}>`,
        });
        continue;
      }
      otherHeaders.push({
        key: a.name,
        value: apiKey,
      });
      continue;
    }
  }
  setHeaders(
    clonedPostman,
    contentType,
    accept,
    cookie,
    headerParams,
    otherHeaders
  );
  setBody(clonedPostman, body);
  return clonedPostman;
}
exports.default = buildPostmanRequest;
