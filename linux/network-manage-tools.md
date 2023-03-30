# 网络配置工具

以下是常见的网络配置工具。

- [NetworkManager](https://networkmanager.dev/): 提供了图形化界面和命令行界面两种方式来管理网络设备，支持 Wi-Fi、有线连接、VPN 等类型的网络连接，并能够自动保存和恢复网络设备的配置。Debian 9 和 Debian 10 默认使用 NetworkManager 来管理网络设备和连接。
- [systemd-networkd](https://wiki.debian.org/SystemdNetworkd): systemd 的网络管理模块。可以用来管理网络设备和连接。它支持通过配置文件或 networkctl 命令来设置网络设备的参数，例如 IP 地址、子网掩码、网关、DNS 等。与 systemd 的其他模块相同，systemd-networkd 可以自动启动并监控所有网络设备和连接。
- [ifupdown](https://manpages.debian.org/unstable/ifupdown/ifup.8.en.html): 包含 ifup, ifdown, ifquery 这三个命令。通过 `/etc/network/interfaces` 来管理网络设备和配置。Debian 8 及更早版本默认使用 ifupdown 来管理网络设备和连接。
- [net-tools](https://github.com/ecki/net-tools): 包含 ifconfig, route, netstat, arp 这些命令。不用研究，已经被 iproute2 取代了。
- [iproute2](https://wiki.linuxfoundation.org/networking/iproute2): 包含 ip, ss 等命令。
- [netplan](https://netplan.io/): netplan 是基于 `/etc/netplan/*.yaml` 配置文件以及 `NetworkManager` 或 `systemd-networkd` 来管理网络设备和配置的工具。
