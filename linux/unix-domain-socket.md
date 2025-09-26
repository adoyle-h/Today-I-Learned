---
title: UNIX Domain Socket
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


UNIX Domain Socket 简称 UDS，又叫 IPC Socket。是一种进程间通信的方法。

UDS 是 POSIX 操作系统的标准组件。

三种类型：

- SOCK_STREAM (compare to TCP) – for a stream-oriented socket
- SOCK_DGRAM (compare to UDP) – for a datagram-oriented socket that preserves message boundaries (as on most UNIX implementations, UNIX domain datagram sockets are always reliable and don't reorder datagrams)
- SOCK_SEQPACKET (compare to SCTP) – for a sequenced-packet socket that is connection-oriented, preserves message boundaries, and delivers messages in the order that they were sent


看[这篇文章](https://eli.thegreenplace.net/2019/unix-domain-sockets-in-go/) 的 Benchmarking UDS compared to loop-back TCP sockets。

[unix domain sockets vs. internet sockets](https://lists.freebsd.org/pipermail/freebsd-performance/2005-February/001143.html)
