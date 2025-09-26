---
title: go generate
created: 2020-10-18T23:08:55+0800
updated: 2020-10-18T23:08:55+0800
---


`go generate` 是 Go 自带的工具。使用命令 `go generate` 执行。它是利用源代码中的注释工作的。格式如下：

`//go:generate command arg1 arg2`

使用注意：

1. `//go:generate` 中间不能有空格。`//` 前面也不能有空格。
2. `go generate` 不会被 `go build`, `go get`, `go test` 以及其他命令触发，你必须执行 generate 命令。
3. command 所在目录得是在环境变量 `PATH` 中可查找到的，或者 command alias，或者绝对路径。

在 `//go:generate` 注释所在同一个目录下执行命令 `go generate` 就会自动运行命令 `command arg1 arg2`。

具体用法见：https://golang.org/pkg/cmd/go/internal/generate/

学习[这个用 stringer 例子][1]。


## 参考资料

- [深入理解Go之generate][1]
- https://blog.golang.org/generate

[1]: https://juejin.im/post/6844903923166216200
