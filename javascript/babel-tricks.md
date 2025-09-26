---
title: babel 小技巧
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## [babel-polyfill][] 与 [babel-runtime][]

- 写类库要用 babel-runtime。并且不能使用扩展基本类型的语法，例如 `Array.includes`。
- 写服务项目要用 babel-polyfill。注意 babel-polyfill 会污染全局基本类型。

[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/
[babel-runtime]: http://babeljs.io/docs/plugins/transform-runtime/
