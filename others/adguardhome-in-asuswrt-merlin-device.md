---
title: 在梅林固件路由器里安装 AdGuard Home
---


## 安装

两种安装方法。使用 amtm 或者 Entware 安装。

### 使用 amtm 安装

登录路由器终端。输入 `amtm`。然后输入 `ag`。用 `Asuswrt-Merlin-AdGuardHome-Installer` 安装 AdGuard Home。

### 使用 Entware 安装

登录路由器终端。执行 `opkg install adguardhome-go`。

注意：如果启动发现 `Illegal instruction` 报错。很可能是因为你安装的版本和系统不匹配。
`uname -a` 查看系统是什么架构。如果你的系统显示 armv7l，依然报错的话。可以尝试 armv5 或者 armv6 的包。
因为我实测在我的 armv7l ASUSWRT-Merlin 无法运行 armv7 的包，居然能运行 armv5 的包。WTF。按照道理 armv7 可以兼容 armv7l 架构的。

去 https://github.com/AdguardTeam/AdGuardHome/releases 下载对应的包。解压后 `mv ./AdGuardHome /opt/bin/AdGuardHome`。

## 启动

执行 `/opt/etc/init.d/S99adguardhome start` 启动服务。
执行 `/opt/etc/init.d/S99adguardhome check` 检查是否启动成功。
