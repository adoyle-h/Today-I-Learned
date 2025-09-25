---
title: 中断
---


- Top-half
- Bottom-half

- 软中断
  - softirq
  - tasklet: 其底层使用softirq机制实现，提供了一种用户方便使用的软中方式，为软中断提供了很好的扩展性。
  - work queue: 前两种软中断执行时是禁止抢占的（softirq的ksoftirq除外），对于用户进程不友好。如果在softirq执行时间过长，会继续推后到work queue中执行，work queue执行处于进程上下文，其可被抢占，也可以被调度，如果软中断需要执行睡眠、阻塞，直接选择work queue。
- 硬中断
  - 可屏蔽中断（maskable interrupt）。硬件中断的一类，可通过在中断屏蔽寄存器中设定位掩码来关闭。
  - 不可屏蔽中断（non-maskable interrupt，NMI）。硬件中断的一类，无法通过在中断屏蔽寄存器中设定位掩码来关闭。典型例子是时钟中断（一个硬件时钟以恒定频率—如50Hz—发出的中断）。
  - 处理器间中断（interprocessor interrupt）。一种特殊的硬件中断。由处理器发出，被其它处理器接收。仅见于多处理器系统，以便于处理器间通信或同步。
  - 伪中断（spurious interrupt）。一类不希望被产生的硬件中断。发生的原因有很多种，如中断线路上电气信号异常，或是中断请求设备本身有问题。


## 参考

- https://www.cnblogs.com/LoyenWang/p/13124803.html
