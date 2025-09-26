---
title: 内存的 buffer 和 cache
---


缓冲 (buffer) 和缓存 (cache) 都是为了提高进程对硬盘的读写效率，解决速度不对等的问题。

cache 用于 CPU 与内存间的读写。完整名称是 Page Cache。用来缓存从硬盘读取出来的数据。下次读取时若命中已缓存需要的数据，就不用去读硬盘，若没有命中就读硬盘。

buffer 用于内存与硬盘间的读写。完整名称是 Buffer Cache。用来缓存尚未写入硬盘的数据。减少磁盘碎片和硬盘的反复寻道，从而提高系统性能。Linux 有一个守护进程定期清空缓冲内容（即写入硬盘）。用户也可以通过 `sync` 命令手动清空缓冲写到硬盘。

## buffer 与 cache 合并

在不同版本的 Linux 系统中，`free` 命令打印的结果，有的是 `cached` 和 `buffers` 分开的，有的是 `buff/cache` 合并在一列的。

这是因为在 Linux 内核 2.4 版本之前，buffer cache 和 page cache 是不同的存储结构。
Linux 内核 2.4 版本之后，buffer cache 被合并到了 page cache，因此使用同一个存储结构。

但是 buffer 和 cache 在功能和概念上还是保持原样，没有合并。

## 清空 cache

```sh
# 清空 page cache
sudo sh -c 'echo 1 > /proc/sys/vm/drop_caches'

# 清空可回收的 slab objects (包括 dentries and inodes)
sudo sh -c 'echo 2 > /proc/sys/vm/drop_caches'

# echo 3 等于 echo 1 加 echo 2 的清空
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'
```

只执行 `echo 1 > /proc/sys/vm/drop_caches` 会显示 `Permission denied`。因为 `sudo` 只是让 `echo` 命令具有了 root 权限，但是没有让 `>` 命令也具有 root 权限，所以会报这个错。
