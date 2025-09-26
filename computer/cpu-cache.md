---
title: CPU 缓存
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

## 多级缓存

CPU 采用多级缓存的架构，是效率和成本的权衡结果。

- L1 Cache: 只被一个 CPU 核独享。L1 Cache 分为指令缓存 (Data Cache，简称 L1d) 和数据缓存 (Instruction Cache，简称 L1i)，两者可同时被 CPU 访问。
- L2 Cache: 只被一个 CPU 核独享。主要作用为当 CPU 在 L1 中没读取到所需要的数据时再把数据展示给 CPU 筛选
- L3 Cache: 被单个插槽上的所有 CPU 核共享
- 主内存 (Main Memory)

L1/L2/L3 Cache 的存储介质都是静态随机存取存储器 (SRAM)，而主内存的存储介质是动态随机存取存储器 (DRAM)。

L1/L2/L3 Cache 也有人分别称为 FLC(First-Level Cache), MLC(Mid-Level Cache), LLC (Last-Level Cache)。

## CPU Cache Line

一个 Cache 由 N 个 Cache Line 组成, 一般大小为 32 或 64 字节。Cache Line 是和内存进行数据交换的最小单位。

（下文简称 Cache Line 为 CL）

L1, L2, L3 Cache。L2 必然包含同核的 L1 的所有 CL，L3 必然包含该 CPU 所有核的 L2 的所有 CL。

可以通过命令 `getconf -a | grep CACHE` 查看 Cache Line Size，例如

```
> getconf -a | grep CACHE
LEVEL1_ICACHE_SIZE                 32768
LEVEL1_ICACHE_ASSOC                8
LEVEL1_ICACHE_LINESIZE             64
LEVEL1_DCACHE_SIZE                 32768
LEVEL1_DCACHE_ASSOC                8
LEVEL1_DCACHE_LINESIZE             64
LEVEL2_CACHE_SIZE                  1048576
LEVEL2_CACHE_ASSOC                 16
LEVEL2_CACHE_LINESIZE              64
LEVEL3_CACHE_SIZE                  34603008
LEVEL3_CACHE_ASSOC                 11
LEVEL3_CACHE_LINESIZE              64
LEVEL4_CACHE_SIZE                  0
LEVEL4_CACHE_ASSOC                 0
LEVEL4_CACHE_LINESIZE              0
```

## Cache Line 映射到主存

组相联映射。组间采用直接映射，组内为全相联。


## CPU 包含策略 (Cache Inclusion Policy)

表示同一个 CL 读取/删除，在其他层的反应的关系策略。
CPU 包含策略作用在 L1/L2/L3，具体策略分配是厂商实现 CPU 指定的。

有三种策略

- Inclusive Policy: 下层 Cache 的 CL **包含**高层 Cache 的 CL。当下层 Cache 的 CL 被驱逐，上层 Cache 对应的 CL 也被驱逐。
- Exclusive Policy: 下层 Cache 的 CL **不包含**高层 Cache 的 CL。获取 CL 优先放到高层 Cache，不会放到下层 Cache。当上层 Cache 的 CL 被驱逐，只是把 CL 从上层移到下层 Cache。
- Non-Inclusive Non-Exclusive Policy (NINE Policy): 下层 Cache 的 CL **不严格包含，也不严格不包含**高层 Cache 的 CL。NINE Policy 和 Inclusive Policy 行为几乎一致，除了一处：当下层 Cache 的 CL 被驱逐，上层 Cache 对应的 CL 不用驱逐。

具体看[这里的图](https://www.wikiwand.com/en/Cache_inclusion_policy)。

## CPU 写策略 (Write policies)

- Write Through
- Write Back

## CPU Cache Coherence

CPU 缓存一致性协议，有两种：嗅探协议和目录协议。

### 嗅探协议

MESI 协议：

- 失效（Invalid）缓存段，要么已经不在缓存中，要么它的内容已经过时。为了达到缓存的目的，这种状态的段将会被忽略。一旦缓存段被标记为失效，那效果就等同于它从来没被加载到缓存中。
- 共享（Shared）缓存段，它是和主内存内容保持一致的一份拷贝，在这种状态下的缓存段只能被读取，不能被写入。多组缓存可以同时拥有针对同一内存地址的共享缓存段，这就是名称的由来。
- 独占（Exclusive）缓存段，和 S 状态一样，也是和主内存内容保持一致的一份拷贝。区别在于，如果一个处理器持有了某个 E 状态的缓存段，那其他处理器就不能同时持有它，所以叫“独占”。这意味着，如果其他处理器原本也持有同一缓存段，那么它会马上变成“失效”状态。
- 已修改（Modified）缓存段，属于脏段，它们已经被所属的处理器修改了。如果一个段处于已修改状态，那么它在其他处理器缓存中的拷贝马上会变成失效状态，这个规律和 E 状态一样。此外，已修改缓存段如果被丢弃或标记为失效，那么先要把它的内容回写到内存中——这和回写模式下常规的脏段处理方式一样。

- [cache之多核一致性(一) - 总线上没有秘密](https://zhuanlan.zhihu.com/p/94811032) ([链接备份](https://web.archive.org/web/20210926113028/https://zhuanlan.zhihu.com/p/94811032))

### Cache Line False Sharing

Cache Coherence 还会引起 [Cache Line False Sharing 问题](./cpu-cache-line-false-sharing.md)。

## 参考资料

- [Wikipedia - CPU缓存](https://www.wikiwand.com/zh-hans/CPU%E7%BC%93%E5%AD%98)
- [Cache 是怎么组织和工作的？](https://zhuanlan.zhihu.com/p/31859105) ([链接备份](https://web.archive.org/web/20200921100404/https://zhuanlan.zhihu.com/p/31859105))
- [Wikipedia - Cache inclusion policy](https://www.wikiwand.com/en/Cache_inclusion_policy)
