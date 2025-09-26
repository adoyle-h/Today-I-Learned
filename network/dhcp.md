---
title: DHCP
---


DHCP 使用 UDP 协议工作，常用的 2 个端口：67 (DHCP Server) 和 68 (DHCP Client)。

## DHCP 分配 IP 的过程

DHCP 客户端（以下简称客户端）会通过网卡以广播的方式发出 DHCPDISCOVER 报文。所有的 DHCP 服务端（以下简称服务端）接收到客户端发送的 DHCPDISCOVER 报文后都会向客户端发送一个 DHCPOFFER 报文。

DHCPOFFER 报文中 `Your(Client) IP Address` 字段就是服务端能够提供给客户端使用的 IP 地址，且服务端会将自己的 IP 地址放在 `option` 字段中以便客户端区分不同的服务端。服务端在发出此报文后会记录已分配的 IP 地址。

客户端只能处理其中的一个 DHCPOFFER 报文，先到先得。

客户端发送 DHCPREQUEST 报文来响应 DHCPOFFER 报文。

服务端发送 DHCPACK 报文来响应 DHCPREQUEST 报文，从而完成 IP 分配。


## DHCP 服务端

## DHCP 客户端

可以手动执行 `dhclient` 命令获取 IP。

```sh
# 客户端从 ens33 网卡获取 IP 地址
dhclient ens33

# 客户端释放从 ens33 网卡获取到的 IP 地址
dhclient -r ens33
```

## 参考

- [DHCP 的服务器与客户端](https://archive.ph/lf9Rm)
- [microsoft - DHCP (动态主机配置协议) 基础知识](https://archive.ph/tLHdD)
