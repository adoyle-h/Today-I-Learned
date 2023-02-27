## eBPF 与 XDP

### 基本概念

- BPF Map
- BPF Program
- Verification
- JIT
- XDP

读完 https://ebpf.io/what-is-ebpf 就能入门基本概念。

#### BPF Map

![](https://ebpf.io/static/map_architecture-e7909dc59d2b139b77f901fce04f60a1.png)

> A vital aspect of eBPF programs is the ability to share collected information and to store state. For this purpose, eBPF programs can leverage the concept of eBPF maps to store and retrieve data in a wide set of data structures. eBPF maps can be accessed from eBPF programs as well as from applications in user space via a system call.

[map 限制](https://docs.cilium.io/en/stable/concepts/ebpf/maps/)

### 详细解读

- https://docs.cilium.io/en/stable/bpf/

### eBPF 生态工具

- bpftool: 查询 BPF programs 的工具
  - [很好的教程](https://qmonnet.github.io/whirl-offload/2021/09/23/bpftool-features-thread/) ([链接备份](https://web.archive.org/web/20221217204319/https://qmonnet.github.io/whirl-offload/2021/09/23/bpftool-features-thread/))
- bps: 列出所有 BPF programs 与 map。program 与 map 之间的关系很直观易懂，[举例](https://github.com/iovisor/bcc/blob/master/introspection/bps_example.txt)
  - Debian 系统可以安装这个包 bpfcc-introspection
  - 里面的 BID 即 prog_id，即 BPF 的 program ID
- [bcc](https://github.com/iovisor/bcc) (BPF Compiler Collection): 基于 eBPF 的 Linux 内核分析、跟踪、网络监控工具。
- [bpftrace](https://github.com/iovisor/bpftrace)
- [cilium](https://github.com/cilium/cilium)

这些都是 eBPF 的前端程序。

其他工具见 https://ebpf.io/projects/

### BPF 与 libbpf

BPF 代码运行时编译，不仅需要 kernel header，而且需携带 llvm/clang 相关的二进制。此外，因 kernel struct 的变更导致 memory layout 产生了变化，无法令编译生成的 eBPF 二进制运行在任意版本 Linux kernel 中，这就无法将 eBPF 二进制与用户态控制程序打包成二进制进行分发。

借助 Linux kernel 提供的 BTF、bpftool 与 libbpf，能够将 eBPF 二进制与用户态控制程序封装至单个 ELF 中，实现 CO-RE (Compile once, run everywhere)，不必再担心因 memory layout 的变更导致 eBPF 二进制不再可用。只要 kernel 的 eBPF 功能具备相应的 feature，它就能正常地运行在该 kernel 之上。并且借助 BTF，编译时不必需要 kernel header。

- [libbpf][]
- [libbpf-tools](https://github.com/iovisor/bcc/tree/master/libbpf-tools)
- [HOWTO: BCC to libbpf conversion](https://facebookmicrosites.github.io/bpf/blog/2020/02/20/bcc-to-libbpf-howto-guide.html) ([链接备份](https://web.archive.org/web/20221130165544/https://facebookmicrosites.github.io/bpf/blog/2020/02/20/bcc-to-libbpf-howto-guide.html))
- [BPF Portability and CO-RE](https://facebookmicrosites.github.io/bpf/blog/2020/02/19/bpf-portability-and-co-re.html) ([链接备份](https://web.archive.org/web/20230120022211/https://facebookmicrosites.github.io/bpf/blog/2020/02/19/bpf-portability-and-co-re.html))

### XDP 模式

XDP 支持三种模式，默认使用 `native` 模式。

- Native (XDP_FLAGS_DRV_MODE)：XDP BPF 程序运行在网络接口控制器 (NIC) 的早期接收路径（RX 队列）上。
- Offloaded (XDP_FLAGS_HW_MODE)：XDP BPF 程序直接在 NIC 中处理报文，而不会使用主机的 CPU。因此，处理报文的成本非常低，性能要远远高于 Native 模式。该模式通常由智能网卡实现，包含多线程，多核流量处理器（以及一个内核的 JIT 编译器，将 BPF 转变为该处理器可以执行的指令）。支持 Offloaded 的驱动通常也支持 Native（某些 BPF 辅助函数通常仅支持native 模式）。
- Generic (XDP_FLAGS_SKB_MODE)：对于没有实现 Native 或 Offloaded 模式的 XDP，内核提供了一种处理 XDP 的通用方案。该模式运行在网络栈中，不需要对驱动进行修改。该模式主要用于给开发者测试使用 XDP API 编写的程序，其性能要远低于 Native 或 Offloaded 模式。在生产环境中，建议使用 Native 或 Offloaded模式。


#### 支持 Native 的网卡驱动列表

- https://github.com/xdp-project/xdp-project/blob/master/areas/drivers/README.org
- https://github.com/iovisor/bcc/blob/master/docs/kernel-versions.md#xdp

### BPF Map 文件

map 数据都放在 `/sys/fs/bpf/` 目录下。

```sh
$ ls -al /sys/fs/bpf/
total 0
drwx-----T 3 root root 0 Jan  5 04:23 .
drwxr-xr-x 8 root root 0 Jan  4 23:24 ..
lrwxrwxrwx 1 root root 0 Jan  5 04:23 ip -> /sys/fs/bpf/tc/
lrwxrwxrwx 1 root root 0 Jan  5 04:23 sa -> /sys/fs/bpf/tc/
lrwxrwxrwx 1 root root 0 Jan  5 04:23 sk -> /sys/fs/bpf/tc/
drwxr-xr-x 3 root root 0 Jan  5 04:23 tc
lrwxrwxrwx 1 root root 0 Jan  5 04:23 xdp -> /sys/fs/bpf/tc/

$ ls -al /sys/fs/bpf/tc/globals
total 0
drwxr-xr-x 2 root root 0 Jan  5 04:24 .
drwxr-xr-x 3 root root 0 Jan  5 04:23 ..
-rw------- 1 root root 0 Jan  5 04:23 cilium_call_policy
-rw------- 1 root root 0 Jan  5 04:23 cilium_calls_00544
-rw------- 1 root root 0 Jan  5 04:24 cilium_calls_01431
-rw------- 1 root root 0 Jan  5 04:23 cilium_calls_02275
-rw------- 1 root root 0 Jan  5 04:23 cilium_calls_02456
-rw------- 1 root root 0 Jan  5 04:24 cilium_calls_03377
-rw------- 1 root root 0 Jan  5 04:23 cilium_calls_04040
-rw------- 1 root root 0 Jan  5 04:23 cilium_calls_hostns_01975
-rw------- 1 root root 0 Jan  5 04:24 cilium_calls_netdev_00003
```

[libbpf]: https://github.com/libbpf/libbpf

### 查找哪些进程连接了 bpf

通过进程打开的文件描述符，可以找到 `anon_inode:bpf-map` 和 `anon_inode:bpf-prog`。也就可以找到对应的进程了。

```sh
$ ls -l /proc/*/fd | grep bpf

lrwx------ 1 root root 64 Jan  5 14:22 31 -> anon_inode:bpf-map
lrwx------ 1 root root 64 Jan  4 23:25 34 -> anon_inode:bpf-prog
```

什么是 anon_inode？详见[这里](./anon_inode.md)。
