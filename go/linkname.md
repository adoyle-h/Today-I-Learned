---
title: //go:linkname
---


用法：`//go:linkname localname` 或 `//go:linkname localname importpath.name`

这在 go 源码中经常见到。

`//go:linkname` 指令并不作用于于后面的 Go 代码。而是指示编译器使用 `importpath.name` 作为名为 `localname` 的**变量或函数**的文件符号名 (file symbol name)。即外部文件可以通过名字 `importpath.name` 引用 `localname`。
如果省略了 `importpath.name` 参数，`importpath.name` 默认是 `localname`。

举个例子，`sync.throw` 实际上是由 [sync_throw 函数](https://github.com/golang/go/blob/aee9a19c559da6fd258a8609556d89f6fad2a6d8/src/runtime/panic.go#L1024-L1027)实现的。通过 `//go:linkname sync_throw sync.throw` 生效。

使用这个指令之前必须要 `import "unsafe"`。

详见 https://pkg.go.dev/cmd/compile
