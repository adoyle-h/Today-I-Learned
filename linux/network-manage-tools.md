---
title: 网络配置工具
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


以下是常见的网络配置工具。

- [NetworkManager](https://networkmanager.dev/): 提供了图形化界面和命令行界面两种方式来管理网络设备，支持 Wi-Fi、有线连接、VPN 等类型的网络连接，并能够自动保存和恢复网络设备的配置。Debian 9 和 Debian 10 默认使用 NetworkManager 来管理网络设备和连接。
- [systemd-networkd](https://wiki.debian.org/SystemdNetworkd): systemd 的网络管理模块。可以用来管理网络设备和连接。它支持通过配置文件或 networkctl 命令来设置网络设备的参数，例如 IP 地址、子网掩码、网关、DNS 等。与 systemd 的其他模块相同，systemd-networkd 可以自动启动并监控所有网络设备和连接。
- [ifupdown](https://manpages.debian.org/unstable/ifupdown/ifup.8.en.html): 包含 ifup, ifdown, ifquery 这三个命令。通过 `/etc/network/interfaces` 来管理网络设备和配置。Debian 8 及更早版本默认使用 ifupdown 来管理网络设备和连接。
- [net-tools](https://github.com/ecki/net-tools): 包含 ifconfig, route, netstat, arp 这些命令。不用研究，已经被 iproute2 取代了。
- [iproute2](https://wiki.linuxfoundation.org/networking/iproute2): 包含 ip, ss 等命令。
- [netplan](https://netplan.io/): netplan 是基于 `/etc/netplan/*.yaml` 配置文件以及 `NetworkManager` 或 `systemd-networkd` 来管理网络设备和配置的工具。

## NetworkManager

### 配置路径

NetworkManager 配置: `/etc/NetworkManager/NetworkManager.conf`

连接配置信息: `/etc/NetworkManager/system-connections/*.nmconnection`。如果手动修改 .nmconnectio 文件，需要执行 `nmcli connection reload` 来生效。

### 连接 wifi

- `nmcli d wifi list` 搜索 wifi 信号
- `nmcli -a d wifi connect $SSID` 连接 wifi。`-a` 参数指示询问密码。
- `nmcli c` 查看当前已保存的链接信息。

### 创建 connection

```sh
# 创建以太网 connection，监听 eth0 网卡。connection 名字为 Wired。
# 配置默认会保存到文件 /etc/NetworkManager/system-connections/Wired.nmconnection
sudo nmcli c add type ethernet ifname eth0 con-name Wired
# 设置静态 IP
sudo nmcli c mod Wired ipv4.method manual ipv4.addresses 192.168.139.130/24 ipv4.gateway 192.168.139.2 ipv4.dns 192.168.139.2
```

### 监听状态

`nmcli monitor` 相当于 `nmcli d monitor` + `nmcli c monitor`

### 如果有多个 connection 监听同一个网卡设备

假设你有两个连接 eth0-home 和 eth0-office 监听同一个网卡 eth0。可以通过 `connection.autoconnect-priority` 设置它们的优先级。
数字越大，优先级越高。

```sh
# 设置 'eth0-home' 的优先级为10
sudo nmcli c mod eth0-home connection.autoconnect-priority 10
# 设置 'eth0-office' 的优先级为1
sudo nmcli c mod eth0-office connection.autoconnect-priority 1
```

查看 autoconnect-priority 的值：`sudo nmcli con show $connection | grep autoconnect-priority`

connection 有重试机制，设置 `sudo nmcli c mod eth0-home connection.autoconnect-retries 1` 取消重试，如果失败则直接尝试下一个 connection。如果 `connection.autoconnect-retries=1`，则会永远重试下去。
