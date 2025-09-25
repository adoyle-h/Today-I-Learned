---
title: SSR (Server Side Render)
---


## 依赖类库要提供什么格式

服务端能用 cjs 模块。

前端能用的 ES5 语法的 ES Module（交给工程的 webpack 再编译）。

## 注意 window 在服务端不可用

类库必须做成 universal 的，很麻烦。
