---
title: sshd -R 参数
---


踩到一个[坑](https://github.com/termux/termux-services/issues/18)。

原因是 sshd 会在每个 ssh 连接时，创建一个子进程来维护连接，子进程会有个 `-R` 的参数标志。

> the -R is an undocumented flag which SSHD uses to indicate to a child process that it has been re-executed in order to re-initialze randomization buffers, etc.

这时如果 sshd 主进程被 kill，主进程不会回收子进程，导致子进程变成了孤儿进程。必须自己手动 kill 子进程。

如果不 kill 子进程会有什么问题？意味着当你关闭了 sshd 的主进程后，虽然别人无法连接这台主机，但是已经建立的 ssh 连接会话还是保留着没断开，别人依然能在当前 ssh 会话中操作这台主机，直到对方主动断开 ssh 连接。

所以**关闭 sshd server 最好使用 `pkill sshd`。**

详见 https://serverfault.com/a/1024676/1006817
