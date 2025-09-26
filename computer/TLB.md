---
title: TLB
created: 2020-09-10T23:28:55+0800
updated: 2020-09-10T23:28:55+0800
---


TLB (Translation Lookaside Buffer) 是[内存管理单元 (MMU)](./MMU.md) 用于改进虚拟地址到物理地址转换速度的缓存。
TLB 又称“快表”，直译为旁路快表缓冲，也可以理解为页表缓冲，地址变换高速缓存。

- [TLB的作用及工作原理](https://www.cnblogs.com/alantu2018/p/9000777.html)
- [虚拟内存的作用，虚拟地址，页表，TLB，缓存原理](https://wangjunstf.github.io/2021/11/09/xu-ni-nei-cun-de-zuo-yong-xu-ni-di-zhi-ye-biao-tlb-huan-cun-yuan-li/) ([链接备份](https://web.archive.org/web/20230311080315/https://wangjunstf.github.io/2021/11/09/xu-ni-nei-cun-de-zuo-yong-xu-ni-di-zhi-ye-biao-tlb-huan-cun-yuan-li/))

## TLB 物理结构


## TLB 歧义问题

同进程的相同的虚拟地址可以映射不同的物理地址。这就会造成歧义 (ambiguity) 问题。
例如，进程 A 将虚拟地址 0x2000 映射物理地址 0x4000。进程 B 将虚拟地址 0x2000 映射物理地址 0x5000。当进程 A 执行的时候将 0x2000 对应 0x4000 的映射关系缓存到 TLB 中。当切换 B 进程的时候，B 进程访问 0x2000 的数据，会由于命中 TLB 从物理地址 0x4000 取数据。这就造成了歧义。

如何消除这种歧义，我们可以借鉴 VIVT 数据 cache 的处理方式，在进程切换时将整个 TLB 无效。切换后的进程都不会命中 TLB，但是会导致性能损失。

## ASID

ASID (Address-Space Identifiers) 是为了解决多进程环境下 TLB 歧义问题而引入的一种机制，它可以标识当前访问的页面属于哪个进程的地址空间，从而避免不同进程之间的虚拟地址映射关系发生歧义。

ASID 需要 CPU 和操作系统共同支持。具体可以参考 [Linux 的 TLB 实现](https://github.com/torvalds/linux/blob/master/arch/x86/mm/tlb.c)。

在 x86 架构中，这个功能又叫做 PCID (Process Context IDentifier)。

不是所有的 CPU 都支持 TLB ASID。目前，大多数现代 CPU 都支持 ASID。例如，ARMv8-A 和 MIPS64 架构都支持 ASID。
在 x86 架构中，Intel 和 AMD 的最新处理器已经支持 ASID。但是一些旧的处理器可能不支持 ASID，如 Intel Pentium Pro，Pentium II 和 Pentium III。

需要注意的是，虽然 ASID 可以很好地解决 TLB 歧义问题，但是使用不当可能会导致安全隐患。
如果恶意程序能够获取当前进程的 ASID 或者猜测其他进程的 ASID，那么它就可以绕过操作系统的地址空间隔离机制，对其他进程的内存进行读写操作。因此，在设计和实现 ASID 机制时，需要考虑到安全性和可靠性等方面的因素。

参考[这篇文章](https://www.cs.swarthmore.edu/~kwebb/cs31/s15/bucs/virtual_memory_hardware.html) ([链接备份](https://web.archive.org/web/20191001194242/https://www.cs.swarthmore.edu/~kwebb/cs31/s15/bucs/virtual_memory_hardware.html)) 里的 Flushing the TLB 章节。

### ASID 只有 0-255 个

因为 ASID 是 8 位的，所以它的范围只有 0-255。这对于大多数系统都没问题。因为系统的 CPU 核数不超过 256，最多只有 256 个进程占用 CPU。

参考[这篇文章](https://community.arm.com/support-forums/f/architectures-and-processors-forum/5229/address-space-identifier---asid) ([链接备份](https://web.archive.org/web/20220926202622/https://community.arm.com/support-forums/f/architectures-and-processors-forum/5229/address-space-identifier---asid))。

## VMID

> For virtual machines, there is a VMID - each guest OS has a VMID and each guest OS has tasks with an ASID. A cache lookup requires both to match a translation, so the ASID rollover code won't clobber entries for another guest OS.
