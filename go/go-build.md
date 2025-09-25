---
title: go build
---


## 构建约束 (Build Constraints)

有两种方式来限制构建约束：

- 构建约束注释
- 文件后缀

**构建约束也适用于测试文件。**

具体见[文档](https://golang.org/cmd/go/#hdr-Build_constraints)

## 构建约束注释

构建约束的注释遵循以下规则:

- 位于文件顶部在包声明之前
- 以 `// +build ` 开始的注释，后跟一个或多个空格
- 在它和包声明之间至少有一个空行，以防止被视为包文档
- 以 `!` 开头的构建标记的规则是逻辑非 (NOT)
- 用空格分隔的规则是逻辑或 (OR)
- 多行，或用逗号分隔的规则是逻辑与 (AND)
- Go major release 版本号，比如 `go1.1` 代表 Go 1.1 版本以及之前版本，`go1.12` 代表 Go 1.12 以及之前版本
- 其他标记，在 `go build` 用 `-tags` 参数来匹配，具体见 `go help build`
  - 比如 `//+build wireinject`，wire 程序会识别这个约束

### 例子

`// +build linux` 只在 linux 系统下构建。

`// +build linux,386 darwin,!cgo` 相当于 `(linux AND 386) OR (darwin AND (NOT cgo))`

```
// +build linux darwin
// +build amd64
```

相当于 `(linux OR darwin) AND amd64`

## 文件后缀

文件后缀匹配 `*_${GOOS}`, `*_${GOARCH}`, `*_${GOOS}_${GOARCH}`。

### 例子

- `source_linux.go` 只在 Linux 系统构建。
- `source_amd64.go` 只在 amd64 架构下构建。
- `source_windows_amd64.go` 只在 windows 系统且是 amd64 架构下构建。

## GOARCH

- `go tool dist list -json` 显示所有支持运行的平台

## 参考

- [Go 注释的魔力](https://learnku.com/go/t/34696)
