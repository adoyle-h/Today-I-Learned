---
title: nftables
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## syntax error near unexpected token `}`

当修改规则报这个错时，要注意 `;` 应该写成 `\;`

错误：`sudo nft chain inet filter input { policy accept; }`

正确： `sudo nft chain inet filter input { policy accept\; }`


## 报错 netlink: Error: cache initialization failed: Invalid argument

可能是没有加载内核模块 nf_tables 导致的问题。这可能是因为编译安装新内核后，旧内核文件被删除，同时新内核文件没有被加载导致的。
查看是否加载 `lsmod | grep nf_tables`。
如果没有，手动加载 `sudo modprobe nf_tables`。
