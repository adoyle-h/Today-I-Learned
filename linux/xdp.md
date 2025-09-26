---
title: XDP
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


XDP（eXpress Data Path）是 Linux 内核提供的一种高性能数据包处理框架。它允许在网络接口驱动程序和协议栈之间插入自定义的 C 代码，以实现对数据包的低延迟、高吞吐量处理。


## XDP 模式

XDP 支持三种模式，默认使用 `native` 模式。

- Offloaded 模式 (XDP_FLAGS_HW_MODE)：对于支持可编程的网卡，XDP BPF 程序直接在网卡的 NIC 中处理报文，而不会使用主机的 CPU。因此，处理报文的成本非常低，性能要远远高于 Native 模式。
  - 该模式通常由智能网卡实现，包含多线程，多核流量处理器（以及一个内核的 JIT 编译器，将 BPF 转变为该处理器可以执行的指令）。支持 Offloaded 的驱动通常也支持 Native（某些 BPF 辅助函数通常仅支持native 模式）。
- Native 模式 (XDP_FLAGS_DRV_MODE)：（目前大部分网卡已经支持）对于支持的网卡驱动，可以在包到达内核后立刻进行处理。XDP BPF 程序运行在网络接口控制器 (NIC) 的早期接收路径（RX 队列）上。
- Generic 模式 (XDP_FLAGS_SKB_MODE)：对于没有实现 Native 或 Offloaded 模式的 XDP，内核提供了一种处理 XDP 的通用方案。可以在 receive_skb 函数此点进行处理。这个处理的位置相对靠后，在 tc 处理点之前，这种性能最差，该模式主要用于给开发者测试调试 XDP BPF 程序。该模式运行在网络栈中，不需要对驱动进行修改。

### 支持 Native 的网卡驱动列表

- https://github.com/xdp-project/xdp-project/blob/master/areas/drivers/README.org
- https://github.com/iovisor/bcc/blob/master/docs/kernel-versions.md#xdp

## 参考文章

- [eBPF 学习摘要 3-XDP 学习和理解](https://www.bladewan.com/2022/10/07/ebpf_3/) ([链接备份](https://web.archive.org/web/20230316175153/https://www.bladewan.com/2022/10/07/ebpf_3/))
