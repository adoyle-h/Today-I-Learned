---
title: Reverse Shell
created: 2021-11-12T17:06:12+0800
updated: 2021-11-12T17:06:12+0800
---


当遇到这些情况，推荐使用反向 Shell 来渗透。

1. 无法直接连接目标机器
2. 目标机器的 IP 会动态改变
3. 目标机器只能发出请求，不能接受请求

执行步骤

1. 在控制端机器监听端口
2. 让目标机器执行反向 shell 命令，请求控制端机器的 ip 和端口。

于是在控制端机器可以获得目标机器的 shell。

反向 shell 命令具体见 [Reverse Shell Cheat Sheet](https://archive.ph/W7dTG)

## nc 不支持 -e 选项的问题

使用 [pwncat](https://github.com/cytopia/pwncat)。
