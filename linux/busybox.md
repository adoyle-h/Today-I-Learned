---
title: Busybox
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


- 主页 https://busybox.net/
- 源码 https://git.busybox.net/busybox/tree/ `git clone git://busybox.net/busybox.git`

BusyBox 将许多常见的 UNIX 命令缩减结合到一个单一的可执行文件中（`busybox` 文件）。

例如 `mkdir` 命令可以用 `busybox mkdir` 运行。
例如 `ls` 命令可以用 `busybox ls` 运行。

它通常可以替换在 GNU [coreutils](http://git.savannah.gnu.org/gitweb/?p=coreutils.git) 里的程序。
BusyBox 的程序通常比 GNU coreutils 的少很多参数。不过满足日常使用。

BusyBox 可以为小型或嵌入式系统提供一个相当完整的环境。
BusyBox 考虑到了尺寸优化和有限的资源。它非常模块化，所以你可以在编译时轻松地包括或排除命令（或功能）。
于是可以很容易地定制你的嵌入式系统。只需在 /dev 中添加一些设备节点，在 /etc 中添加一些配置文件，再加入一个 Linux 内核。

注意： **BusyBox 使用 GPL v2 协议开源**。如果不想开源，可以使用 [toybox](https://landley.net/toybox/)，MIT 协议。

## shell

```
/busybox/sh -> busybox
/busybox/ash -> busybox
```

ash 支持登录后自动按顺序执行 /etc/profile 和 ~/.profile 文件里的内容。
