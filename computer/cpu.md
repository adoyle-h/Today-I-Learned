---
title: CPU
created: 2020-09-10T23:28:55+0800
updated: 2020-09-10T23:28:55+0800
---

## 物理 CPU

一个 CPU Socket 里可以由多个 CPU Core 和一个 Uncore 部分组成。每个 CPU Core 内部可以有多个 Thread。

可以通过 `lscpu` 命令查看。

### CPU 的物理拓扑图

- Socket
  - Core
    - 算术逻辑单元 (ALU)
    - 浮点运算单元 (FPU)
    - L1 Cache
    - L2 Cache
    - Hyper Threads
    - 寄存器（以 x86 架构为例）
      - 通用寄存器
        - 数据寄存器
          - AX (Accumulator): 累加寄存器，也称之为累加器
          - BX (Base): 基地址寄存器
          - CX (Count): 计数器寄存器
          - DX (Data): 数据寄存器
        - 指针寄存器
          - SP (Stack Pointer): 堆栈指针寄存器
          - BP (Base Pointer): 基指针寄存器
        - 变址寄存器
          - SI (Source Index): 源变址寄存器
          - DI (Destination Index): 目的变址寄存器
      - 段寄存器
        - CS (Code Segment): 代码段寄存器
        - DS (Data Segment): 数据段寄存器
        - SS (Stack Segment): 堆栈段寄存器
        - ES (Extra Segment): 附加段寄存器
      - 控制寄存器
        - IP (Instruction Pointer): 指令指针寄存器
        - FLAG: 标志寄存器


  - Uncore
    - L3 Cache
    - QPI 控制器
    - 高速 PCI Express 控制器
    - DMI 控制器
    - 内存控制器 (iMC: Integrated Memory Controller)
    - CBox (负责缓存一致性)


解释：

- Uncore: 是英特尔用来描述CPU中，功能上为非处理器核心（Core）所负担，但是对处理器效能的发挥和维持有必不可少的作用的组成部分。
- Socket: 一个 Socket 是主板上的一个 CPU 插槽。Socket 数量就是物理 CPU 的数量。
- Core: CPU 的运算核心单元。一个物理 CPU 里可以有多个 Core。

### iMC

### Hyper Threads

超线程（HT, Hyper-Threading）是 Intel 研发的一种技术。一个 x86 的物理 CPU 中提供多个逻辑处理单元 (Thread)。每个 Thread 都是操作系统可见的逻辑 CPU。

超线程 AMD 也有，早在 1999 年申请了 SMT(Simultaneous Multithreading) 的技术专利，而 Intel 发布 HT 是在 2002 年。SMT 与 HT 技术大致一样。本文以 Intel x86 架构为代表。

不过 ARM CPU 没有普遍应用 SMT，直到 2018 年出的 [CORTEX-A65AE](https://www.arm.com/products/silicon-ip-cpu/cortex-a/cortex-a65ae)。
目前大部分 CPU 是 SMT-2 的（即每个物理 CPU 有 2 个 HT）。但也有 SMT-4（比如 IBM Power 7）和 SMT-8（IBM Power 8）。

### Ring Interconnect

### QPI link

快速通道互联 (QPI: QuickPath Interconnect)，用来支持 NUMA Node 之间的互联。

### TLB

详见[这篇](./TLB.md)

### CPU DIE

裸晶 (die)，也称裸芯片、裸芯片或裸片，是以半导体材料制作而成未经封装的一小块集成电路本体。

## 逻辑 CPU

逻辑 CPU 数量 = 物理 CPU 数 × CPU 核数 × 每个 CPU 核的线程数

可以通过 `lscpu` 命令查看。

## 多处理器架构

- AMP  (Asymmetric Multi-Processing): 非对称多处理器
- SMP  (Symmetric Multi-Processor): 对称多处理器
- UMA  (Uniform Memory Access): 一致存储访问
- NUMA (Non-Uniform Memory Access): 非一致存储访问
- MPP  (Massive Parallel Processing): 大规模(海量)并行处理

详见[《SMP、NUMA、MPP体系结构介绍》](https://www.cnblogs.com/yubo/archive/2010/04/23/1718810.html)。

### SMP

对称多处理器 (Symmetric Multi-Processor)。各 CPU 共享相同的物理内存，每个 CPU 访问内存中的任何地址所需时间是相同的，因此 SMP 也被称为一致存储器访问结构 (UMA: Uniform Memory Access) 。

### NUMA

NUMA 最大的特点是 CPU 直接连接内存。

NUMA 架构解决了 CPU 核上限的瓶颈，通过加 Node 实现多核扩展。
一个 Node 包含一个或者多个 Socket。

AMD 公司提出了 [Hypertransport](https://www.wikiwand.com/zh-cn/HyperTransport) 技术。取代前端总线，让 CPU 通过这个传输技术访问内存，而不是直接访问内存。在 AMD 的锐龙处理器架构中，Infinity Fabric 取代了 Hypertransport。

### MPP

海量并行处理结构

- [Linux NUMA Optimization - 1](http://oliveryang.net/2016/02/linux-numa-optimization-1/)
