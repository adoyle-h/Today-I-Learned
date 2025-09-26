---
title: YAML Language Server
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


https://github.com/redhat-developer/yaml-language-server

## 例子

```json
"yaml.schemas": {
  // "https://kubernetesjsonschema.dev/v1.16.0/all.json": "/*",
  // "file:///Users/adoyle/json-schemas/kubernetes-json-schema/v1.16.4-local/all.json": "/*",
  // "http://json.schemastore.org/ansible-stable-2.9": ["/roles/*"],
  // "file:///Users/adoyle/json-schemas/ansible-stable-2.9.json": "/*",
  // "http://json.schemastore.org/travis": "/.travis.yml",
}
```

## 使用本地文件

因为 YAML LS 每次都会去请求 url 指定的 json schema，且不会缓存文件内容到本地。会导致一开始没有任何补全和提示，以为 YAML Language Server 出问题，其实是因为 JSON Schema 还在下载中。
比如 ansible 的 json schema，足足有 11 MB 大。K8S 的更大。

使用 `file://` 可以指定本地路径，比如 `"file:///Users/adoyle/json-schemas/ansible-stable-2.9.json": "/*"`。

注意还要检查 JSON SCHEMA 文件内容，ref 是否有引用外部 http 资源。这会导致 YAML LS 每次都会去下载那些资源。
建议你使用 local 版本的 K8S JSON SCHEMA 文件，`git clone https://github.com/instrumenta/kubernetes-json-schema.git` ，例如 `file://<your-path>/kubernetes-json-schema/v1.16.4-local/all.json`。

## 匹配多个文件

`["/a.yml", "/b.yml"]`，这里的 / 路径是相对于当前工作目录。

## 通配符

`"/a*"` 实际上会转换成 `/a.*/` 正则。

https://github.com/redhat-developer/yaml-language-server/blob/0.7.2/src/languageservice/utils/strings.ts#L41-L43

## 正则匹配

可以使用正则，例如 `/a.+/i/`。

详见[这行](https://github.com/redhat-developer/yaml-language-server/blob/0.7.2/src/languageservice/utils/strings.ts#L36)

## Matches multiple schemas when only one must validate

目前不支持有多个 json schema 匹配，所以 yaml.schemas 得自己手动调整。
