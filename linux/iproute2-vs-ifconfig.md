---
title: iproute2 与 ifconfig 命令
created: 2019-09-24T21:37:50+0800
updated: 2019-09-24T21:37:50+0800
---


[iproute2](https://wiki.linuxfoundation.org/networking/iproute2) 提供一系列网络命令工具，代替 `ifconfig` 和 `route` 等命令。

ifconfig 是 net-tools 中已被废弃使用的一个命令，许多年前就已经没有维护了。

iproute2 提供的命令：

- ip
- ss
- rtacct
- ifcfg 脚本

从 ifconfig 和 route 到 iproute2 的对比：

![Nettools-vs-Iproute2.png](https://img.linux.net.cn/data/attachment/album/201406/04/003404uy9l1t5zayzllylm.png)
([链接备份](https://web.archive.org/web/20200905191251/https://linoxide.com/wp-content/uploads/2014/05/Linux-Nettools-vs-Iproute2.png))

```
ip [ OPTIONS ] OBJECT [ COMMAND [ ARGUMENTS ]]

OBJECT:

OBJECT is the object type on which you wish to operate on or obtain information about. The object types understood by the current ip utility are link, address, neighbor, route, rule, maddress, mroute, and tunnel.

link --- physical or logical network device.
address --- protocol (IPv4 or IPv6) address on a device.
neighbour --- ARP or NDISC cache entry.
route --- routing table entry.
rule --- rule in routing policy database.
maddress --- multicast address.
mroute --- multicast routing cache entry.
tunnel --- tunnel over IP.
```

### Mac 系统使用 iproute2 工具包

Mac 系统通过 `brew install iproute2mac` 来安装，[源码](https://github.com/brona/iproute2mac)，但是这并不完全兼容 iproute2，因为本质上还是调用 Mac 工具链来模拟 iproute2 工具包的行为。

### 参考资料

- [Linux Advanced Routing & Traffic Control HOWTO](https://lartc.org/howto/)
- [IPROUTE2 Utility Suite Howto](http://www.policyrouting.org/iproute2.doc.html) ([链接备份](https://web.archive.org/web/20220807073512/http://www.policyrouting.org/iproute2.doc.html))
- [Linux IP Command – Examples + Options](https://linuxopsys.com/topics/linux-ip-command) ([链接备份](https://web.archive.org/web/20221229145109/https://linuxopsys.com/topics/linux-ip-command))

### 重启机器，路由失效

Linux 系统，`ip` 以及 `route` 命令添加的路由，机器重启或者网卡重启后路由就会失效。需要去改 `/etc/sysconfig/network-scripts/` 目录下对应的网卡信息来固化。

### ifcfg

详见 [网络接口配置](./network-interface-configuration.md)。
