---
title: dmesg
---


dmesg 用来显示或控制内核环缓冲区（kernel-ring buffer）的内容。

在开机系统引导 (boot) 阶段，内核将与硬件和模块初始化相关的信息填到这个缓冲区中。这些消息也存在 `/var/log/dmesg` 文件里。

`dmesg` 命令会直接输出所有消息。使用 `dmesg -H` 来滚屏阅读更方便。

## Kernel Ring Buffer

Kernel Ring Buffer 由一块内存区域和两个指针组成，其中一个指向缓冲区的起始位置，另一个则指向当前可写入的位置。当缓冲区满时，新的消息将从缓冲区的起始位置覆盖旧的消息。

Kernel Ring Buffer 的大小是由内核启动参数 log_buf_len 决定的，它指定了内核环形缓冲区的最大大小。
默认情况下，log_buf_len 的值为 16KB 或 1/12 的物理内存大小（以较小者为准）。

`dmesg -n 64K` 可以将 Kernel Ring Buffer 的大小设为 64KB。
