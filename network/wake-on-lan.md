---
title: Wake On Lan (WOL)
---


电脑处在关机（或休眠）状态时，机内的网路卡及主机板部分仍保有微弱的供电，此微弱供电能让网路卡保有最低的运作能力，使网路卡能聆听来自电脑外部的网路广播资讯，并对资讯内容进行侦测与解读，一旦发现网路广播的内容中有特定的“魔法封包”（Magic Packet），就会对该封包的内容进行研判。

魔法封包是以广播方式发送的，广播的方式与范畴可以是整个区域网路（LAN），也可以是特定的子网路（Subnet），同时魔法封包内会有某部（或一群）电脑的网路位址资料，网路卡一旦解读研判出所指的位址是自身所处的电脑时，网路卡就会通知机内的主机板、电源供应器，开始进行开机（或唤醒）的程序。

https://wiki.archlinux.org/title/Wake-on-LAN

网上文章说要在系统里设置唤醒，`ethtool -s <interface> wol g`。但我实测在 `Wake-on: d` 情况下，依然能够网络唤醒成功。所以跟 ethtool 的设置无关，只跟 BIOS 设置有关。

## 查看是否支持 WOL

安装 ethtool 工具后，执行 `ethtool interface | grep Wake-on`。

```
# 支持的唤醒模式
Supports Wake-on: pumbag
# 当前的唤醒模式
Wake-on: d
```

```
p   Wake on PHY activity
u   Wake on unicast messages
m   Wake on multicast messages
b   Wake on broadcast messages
a   Wake on ARP
g   Wake on MagicPackettm
s   Enable SecureOntm password for MagicPackettm
f   Wake on filter(s)
d   Disable  (wake on nothing). This option clears all previous options.
```

## 开启 WOL

要在 BIOS 里开启网络唤醒。


## 固化网卡配置

ethtool 修改网卡信息在系统重启后会失效。如果要固化配置，有很多方法，参考[文章](https://wiki.archlinux.org/title/Wake-on-LAN#Make_it_persistent)。

## MagicPackettm

魔法封包（Magic Packet）是一个广播性的帧（frame），透过 UDP 协议和端口 7 或 9 发送。

在魔法封包内，每次都会先有连续 6 个 "FF"（十六进位，换算成二进位即：11111111）的资料，即：`FF FF FF FF FF FF`，在连续 6 个 "FF" 后则开始带出 MAC 位址资讯，有时还会带出 4 位元组或 6 位元组的密码，一旦经由网路卡侦测、解读、研判（广播）魔法封包的内容，内容中的 MAC 位址、密码若与电脑自身的位址、密码吻合，就会启动唤醒、开机的程序。
