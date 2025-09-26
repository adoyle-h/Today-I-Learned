---
title: Rollup Dynamic Import
created: 2019-04-24T00:15:26+0800
updated: 2019-04-24T00:15:26+0800
---


在 rollup v1 版本中支持了 Dynamic Import 来做 code split。
然而不太好用。

折腾好久的结论：两年内我不会使用 Rollup 了，用 Webpack 吧。

## 必须设置 output.dir

`output.file` 和 `output.dir` 只能二选一，`output.dir` 不设置的话，其他 chunk 文件不会写到文件里。

## Dynamic Import 不支持通配符

https://github.com/rollup/rollup/issues/2097

## UMD and IIFE output formats are not supported for code-splitting builds.

https://github.com/rollup/rollup/issues/2072

参考方案：[rollup-plugin-loadz0r](https://github.com/surma/rollup-plugin-loadz0r)，但是限制是 AMD 模块。
