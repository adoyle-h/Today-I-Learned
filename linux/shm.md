---
title: 共享内存
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


共享内存有两种方式，

- POSIX 共享内存: mmap、shm_open、shm_unlink
- System V 共享内存: shmget、shmat、shmdt、shmctl

必读

- [认真分析mmap：是什么 为什么 怎么用](https://www.cnblogs.com/huxiao-tee/p/4660352.html)
- [从内核文件系统看文件读写过程](https://www.cnblogs.com/huxiao-tee/p/4657851.html)

## mmap

mmap 是将文件映射到进程的虚拟空间。

mmap 要和基于内存的文件系统（例如 tmpfs）配合，才能做到最高效的数据传输。

### mmap on socket

> mmap() facility available with the PACKET socket interface on 2.4/2.6/3.x kernels

https://www.kernel.org/doc/Documentation/networking/packet_mmap.txt
