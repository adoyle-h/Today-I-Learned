---
title: 进程亲和性 (Processor Affinity)
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


进程的处理器亲和性 (Processor Affinity)，即 cpu 绑定设置，是指将进程绑定到特定的一个或多个 cpu 上去执行，而不允许将进程调度到其他 cpu 上。Linux 内核对进程的调度算法也是遵守进程的处理器亲和性设置的。设置进程的处理器亲和性带来的好处是可以减少进程在多个 cpu 之间交换运行带来的缓存命中失效 (cache missing)，从该进程运行的角度来看，可能带来一定程度上性能的提升。

## isolcpus

isolcpus 功能存在已久，从内核版本 v2.6.11 (2005 年) 那时就已经支持了该功能。

isolcpus 功能主要用于在 SMP 均衡调度算法中将一个或多个 CPU 孤立出来。同时可通过亲缘性设置将目标进程置于该“孤立 CPU”中运行；这种方法是推荐的使用“孤立 CPU”的方式，与手动设置每个任务的亲缘性相比，后者会降低调度器的性能；






## 参考文章

- https://wangpifu.github.io/post/cpu-affinity-qin-he-xing/ ([链接备份](https://web.archive.org/web/20200913043452/https://wangpifu.github.io/post/cpu-affinity-qin-he-xing/))
