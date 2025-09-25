---
title: docker macvlan
---


## 使用场景

给容器分配局域网 IP 和独立 Mac 地址。

## 前置要求

1. `sudo modprobe macvlan` 开启 macvlan 内核模块。
2. 物理网卡支持 macvlan。
3. 物理网卡开启混杂模式。

## 注意

1. podman、nerdctl、docker 在 rootless 模式下都不支持 macvlan。
2. nerdctl 的 macvlan 子网不支持跟宿主机的网段有重合。就没法获取宿主机的局域网 IP。详见 [issue](https://github.com/containerd/nerdctl/issues/2490)。然而 docker 没这问题。
3. nerdctl compose 不支持 mac_address。然而 docker 没这问题。

## mac_address

mac_address 的地址似乎可以随意填。不必与物理网卡的 mac 地址的前缀保持一致。
如果遇到奇怪的问题，建议尝试 mac 地址前缀部分与物理网卡的保持一致。

## 排查问题

可以自己手动创建 macvlan 来排查问题。`sudo ip link add link eth0 name macvlan0 type macvlan mode bridge`
如果显示 `Unknown device type.` 那就是内核模块没开启。

## 宿主机无法访问 macvlan 容器的 IP

这是因为 kernel 中有关 macvlan 的安全策略会完全过滤来自 host 访问。

解决方案参考[这篇文章](https://www.cnblogs.com/azureology/p/16750154.html) ([链接备份](https://web.archive.org/web/20231103173715/https://www.cnblogs.com/azureology/p/16750154.html))。

如果你使用 network-manager，可以按以下方法持久化。

```sh
# 10.0.1.254 跟容器同网段，但不冲突的 IP。
nmcli c add con-name my-macvlan type macvlan ifname my-macvlan18 ipv4.addresses 10.0.1.254/32 dev eth0 mode bridge
# 不自动分配 IP
nmcli c modify my-macvlan ipv4.method manual
# 10.0.1.100 是容器的 IP。192.168.1.20 是宿主机的 IP。填你的实际值。
nmcli c modify my-macvlan ipv4.routes "10.0.1.100/32 src 192.168.1.20"
# docker 会给容器创建路由，默认 metric 100。我设置的规则必须得优先于它。
nmcli c modify my-macvlan ipv4.route-metric 70
nmcli c up my-macvlan
```

参考[这篇文章](https://www.networkshinobi.com/docker-host-cant-access-containers-running-on-macvlan/) ([链接备份](https://web.archive.org/web/20230402090230/https://www.networkshinobi.com/docker-host-cant-access-containers-running-on-macvlan/))
