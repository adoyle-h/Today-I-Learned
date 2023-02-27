## BPF 与 XDP

eBPF (extended Berkeley Packet Filter) 起源于 BPF，它提供了内核的数据包过滤机制。

XDP (eXpress Data Path) 是一个 eBPF 指令虚拟机。运行在内核上下文中处理网络流。在网卡收到的包后，把包传递给内核协议栈之前，被 XDP 处理。因此 bypass 内核网络协议栈。它无需任何特殊硬件特性，任何有 Linux 驱动的网卡都可以支持。

https://ebpf.io/
