---
title: MacOS 通过命令行修改 IP 地址
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


举个例子。我正在使用 RJ45 转 USB 转接器。当前的网络设备 en7 的 ip 地址是 169.254.31.164，要修改成 10.18.18.18。

## 修改前先确认

```sh
# 先列出所有 networkservice
> networksetup -listallnetworkservices
An asterisk (*) denotes that a network service is disabled.
USB 10/100/1000 LAN
Wi-Fi
雷雳网桥

# 这里 USB 10/100/1000 LAN 是转换器对应的网络服务

# 查看 networkservice 信息
> networksetup -getinfo 'USB 10/100/1000 LAN'
DHCP Configuration
IP address: 169.254.31.164
Subnet mask: 255.255.0.0
Router: (null)
Client ID:
IPv6: Automatic
IPv6 IP address: none
IPv6 Router: none
Ethernet Address: 00:e0:4b:6a:2f:bc

# 查看网络接口信息，二次确认
> ifconfig
en7: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
  options=6464<VLAN_MTU,TSO4,TSO6,CHANNEL_IO,PARTIAL_CSUM,ZEROINVERT_CSUM>
  ether 00:e0:4b:6a:2f:bc
  inet6 fe80::c6e:e167:feb3:7885%en7 prefixlen 64 secured scopeid 0x17
  inet 169.254.31.164 netmask 0xffffff00 broadcast 169.254.255.255
  nd6 options=201<PERFORMNUD,DAD>
  media: autoselect (1000baseT <full-duplex>)
  status: active
```

## 修改

```sh
> networksetup -setmanual 'USB 10/100/1000 LAN' 10.18.18.18 255.255.255.0 10.18.18.1
```

## 修改以后

```sh
> ifconfig en7
en7: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
  options=6464<VLAN_MTU,TSO4,TSO6,CHANNEL_IO,PARTIAL_CSUM,ZEROINVERT_CSUM>
  ether 00:e0:4b:6a:2f:bc
  inet6 fe80::c6e:e167:feb3:7885%en7 prefixlen 64 secured scopeid 0x17
  inet 10.18.18.18 netmask 0xffffff00 broadcast 10.18.18.255
  nd6 options=201<PERFORMNUD,DAD>
  media: autoselect (1000baseT <full-duplex>)
  status: active
```
