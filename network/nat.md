---
title: NAT
---


## SNAT

适用于局域网内的用户用同一个公网 IP 来访问外网。

在数据包从网卡发送出去的时候，把数据包中的源地址部分替换为指定的 IP。这样接收方就认为数据包的来源是被替换的那个 IP 的主机。

`iptables -t nat -I POSTROUTING -o 外网网卡 -s 内网网段 -j SNAT --to-source 公网IP地址`

## DNAT

适用于局域网内的服务映射到公网 IP，对外网提供服务。

`iptables -t nat -I PREROUTING -i 外网网卡 -d 外网ip tcp --dport 发布的端口 -j DNAT --to-destination 内网服务ip:端口`

## MASQUERADE

MASQUERADE 是 SNAT 的一个特例。
用网卡的 IP 来替换源 IP，因此，对于那些 IP 不固定的场合，比如拨号网络或者通过 DHCP 分配 IP 的情况下，就得用 MASQUERADE。
