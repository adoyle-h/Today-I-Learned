---
title: go doc
created: 2020-10-18T23:08:55+0800
updated: 2020-10-18T23:08:55+0800
---


`go doc` 与 `godoc` 是两个不同的命令。

- `go doc` 提供命令行查询
  - `go doc -u` 可以查看私有成员。
  - `go help doc` 查看用法和例子。
- `godoc` 提供 web 页面查询。主要用于在无法联网的环境下。
  - 在 golang 1.13 之前是内置命令，1.13 里被移除了，需要自行安装，执行 `go get golang.org/x/tools/cmd/godoc`。
