---
title: link
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## ethtool

`ethtool <device>` 查看以太网接口信息。可以查看接口的带宽，全双工还是半双工。

- `Speed: 100Mb/s` 传输速度
- `Duplex: Full` Full 全双工，Half 半双工
- `Link detected: yes` 是否已接入网线
- `Supports Wake-on: pumbg` 支持哪些网络唤醒
- `Wake-on: g`

- `ethtool -p <device> 10` 亮起指定接口的指示灯 10 秒
- `ethtool -S <device>` 显示收发包、错误包、丢包统计
- `ethtool -e <device> raw on > eeprom-backup.bin` 备份网卡存储器 (EEPROM) 里的信息
- `ethtool -E <device> <option...>`
- `ethtool -i <device>` 显示网卡驱动的信息
- `ethtool -a <device>` 显示网卡的 Pause 帧是否开启
- `ethtool -A <device> [autoneg on|off] [rx on|off] [tx on|off]` 设置网卡的 Pause 帧的开关

## 固化网卡配置

ethtool 修改网卡信息在系统重启后会失效。如果要固化配置，有很多方法，参考[文章](https://wiki.archlinux.org/title/Wake-on-LAN#Make_it_persistent)。

## networkctl

networkctl 是 systemd-networkd 提供的命令行。

- `networkctl list` 查看所有设备的情况。
- `networkctl status` 相当于 `systemctl status systemd-networkd`。
- `networkctl up <device>` 启动接口
- `networkctl down <device>` 关闭接口
- `networkctl lldp` 查看链路层邻居
- `networkctl renew <device>` 强制更新 DHCP 租约，从 DHCP 服务器获取新的 IP、路由、DNS 等配置。（但有时候好像没作用）
