---
title: CPU 伪共享 (CPU Cache Line False Sharing)
created: 2020-09-10T23:28:55+0800
updated: 2020-09-10T23:28:55+0800
---


也称 Cache Line Bouncing。

## 检测方法

`perf c2c` 命令。详见[这篇文章][1]

## 解决方案

缓存行填充（也称缓存行对齐）。增加无意义的变量声明，增加冗余空间来填充到一个 Cache Line 的长度。

Java 提供了 `@sun.misc.Contended` 注解来自动填充。
Go 提供了 [`CacheLinePad`](https://pkg.go.dev/golang.org/x/sys/cpu#CacheLinePad) 来填充。

## 参考资料

- [杂谈 什么是伪共享（false sharing）？](https://zhuanlan.zhihu.com/p/65394173) ([链接备份](https://web.archive.org/web/20210814041728/https://zhuanlan.zhihu.com/p/65394173))
- [Cache False Sharing Debug][1] ([链接备份](https://web.archive.org/web/20220605234229/http://oliveryang.net/2018/01/cache-false-sharing-debug/))


[1]: http://oliveryang.net/2018/01/cache-false-sharing-debug/
