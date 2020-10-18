## Gorutine

Gorutine 是 Go 语言实现的一种协程 (Coroutine)。它完全运行在用户态进程下进行并发调度。

- [Golang：线程 和 协程 的区别](https://juejin.im/post/6844903958008348686)
- [Golang 的 协程调度机制 与 GOMAXPROCS 性能调优](https://juejin.im/post/6844903662553137165)
- [Golang和Erlang的并发调度浅析](https://studygolang.com/articles/18968)

### GMP 模型与调度器

- [Golang调度器GMP原理与调度全分析](https://zhuanlan.zhihu.com/p/112508755)
- [Go语言学习 - GMP模型](https://juejin.im/post/6844904034449489933)
- [图解Go运行时调度器](https://tonybai.com/2020/03/21/illustrated-tales-of-go-runtime-scheduler/)

### 调度器跟踪

使用 `GODEBUG=schedtrace=DURATION` 环境变量运行 Go 程序以启用调度程序跟踪。（DURATION 是以毫秒为单位的输出周期。）

调度器跟踪详见[这里](https://github.com/golang/go/wiki/Performance#scheduler-trace)。
