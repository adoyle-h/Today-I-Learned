## 虚拟内存

### 为什么会有虚拟内存

1. 解决进程间的内存隔离问题。
2. 解决内存不够用的问题。

### 概念

1. 物理地址 (Physical Address)：也叫实地址 (Real Address)、二进制地址 (Binary Address)，它是在地址总线上，以电子形式存在的，使得数据总线可以访问主存的某个特定存储单元的内存地址。
2. 逻辑地址 (Logical Address)：程序角度看到的内存地址。比如 C 语言中的存储指针的地址。
3. 线性地址 (Linear Address)：国内有人也叫虚拟地址 (Virtual Address)，是逻辑地址到物理地址变换之间的中间层。在分段部件中，逻辑地址是段中的偏移地址，然后加上基地址就是线性地址。

### 逻辑地址如何映射到物理地址

[Linux内存地址映射](http://ilinuxkernel.com/?p=1276) ([备份链接](https://web.archive.org/web/20201128080735/http://ilinuxkernel.com/?p=1276))
