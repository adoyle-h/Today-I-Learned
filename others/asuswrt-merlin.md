---
title: 梅林固件 asuswrt-merlin
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


[梅林固件](https://www.asuswrt-merlin.net/)是针对华硕路由器 (Asus Routers) 的固件。

本文也适用于 [Xwrt-Vortex](https://xvtx.ru/xwrt/) 固件。其他路由器也可以刷梅林固件。

## amtm

[amtm (Asuswrt-Merlin Terminal Menu)](https://github.com/decoderman/amtm)

## 文件系统

```sh
> mount
rootfs on / type rootfs (rw)
/dev/root on / type squashfs (ro,relatime)

> df -Th
Filesystem           Type            Size      Used Available Use% Mounted on
/dev/root            squashfs       30.0M     30.0M         0 100% /
```

squashfs 是一种压缩的文件系统。它的 100% Use 是正常的。
squashfs 文件系统是只读的。因此你无法在 `/` 目录下创建新文件。

```sh
> l /
drwxr-xr-x    2 admin    root           769 Aug  8  2021 bin/
drwxr-xr-x    2 admin    root             3 Aug  8  2021 cifs1/
drwxr-xr-x    2 admin    root             3 Aug  8  2021 cifs2/
drwxr-xr-x    5 admin    root          1660 May  5  2018 dev/
lrwxrwxrwx    1 admin    root             7 Aug  8  2021 etc -> tmp/etc/
lrwxrwxrwx    1 admin    root             8 Aug  8  2021 home -> tmp/home/
drwxr-xr-x   12 admin    root             0 Sep 10 23:56 jffs/
drwxr-xr-x    3 admin    root           293 Aug  8  2021 lib/
lrwxrwxrwx    1 admin    root             9 Aug  8  2021 media -> tmp/media
drwxr-xr-x    2 admin    root             3 Aug  8  2021 mmc/
lrwxrwxrwx    1 admin    root             7 Aug  8  2021 mnt -> tmp/mnt/
lrwxrwxrwx    1 admin    root             7 Aug  8  2021 opt -> tmp/opt
dr-xr-xr-x  105 admin    root             0 Jan  1  1970 proc/
drwxr-xr-x    5 admin    root           143 Aug  8  2021 rom/
lrwxrwxrwx    1 admin    root            13 Aug  8  2021 root -> tmp/home/root/
drwxr-xr-x    2 admin    root          2978 Aug  8  2021 sbin/
drwxr-xr-x   11 admin    root             0 Jan  1  1970 sys/
drwxr-xr-x    2 admin    root             3 Aug  8  2021 sysroot/
drwxrwxrwx   16 admin    root           860 Sep 10 23:56 tmp/
drwxr-xr-x   10 admin    root           169 Aug  8  2021 usr/
lrwxrwxrwx    1 admin    root             7 Aug  8  2021 var -> tmp/var/
drwxr-xr-x   16 admin    root          8644 Aug  8  2021 www/
```

你会发现 `/etc`, `/mnt` 用的都是 `/tmp` 的文件系统，即 tmpfs。这意味着路由器重启后，这些文件都将消失。

所以如果你要持久保存文件，需要把文件保存到 `/jffs/` 或者 `/opt` 中。

这里 `/opt` 实际上指向的是 `/tmp/mnt/sda1/entware/`。即外置 USB 设备安装的 entware 目录。
系统会自动挂载外部 USB 设备。比如设备名 `/dev/sda1`，就会自动创建 `/tmp/mnt/sda1` 并且挂载上。

## 开机自启动

如果你要开机后自动执行脚本。则需要使用[用户脚本](https://github.com/RMerl/asuswrt-merlin.ng/wiki/User-scripts)。用户脚本都存储在 `/jffs/scripts/` 下。

### /etc/fstab

因为 /etc 目录都是在 tmpfs 下的，重启路由器后文件就会重置。

解决方案：
在 `/jffs/scripts/init-start` 脚本中创建挂载点，即 `mkdir /mnt/usb0`。
然后在 `/jffs/configs/fstab` 里写 `/etc/fstab` 的内容。

[init-start](https://github.com/RMerl/asuswrt-merlin.ng/wiki/User-scripts#init-start) 是在挂载 JFFS 之后，在任何服务启动之前调用的。

## Entware 与 opkg

Entware 需要通过 amtm 安装。首先插入一个 U 盘，执行 `amtm`，输入 `ep`，选择把 entware 安装到 U 盘中。

安装完后执行 `opkg update`。然后就能用 opkg 安装其他软件了。

详见 https://github.com/RMerl/asuswrt-merlin.ng/wiki/Entware

### 注意

如果你使用梅林固件自带的 fdisk 格式化 U 盘。需要在 fdisk 加上 `-u` 参数。详见 `fdisk --help`。

因为这个 fdisk 是 BusyBox 版本的，与 GNU 不一样。它默认使用 CHS (Cylinder-Head-Sector) 而不是 LBA (Logical Block Addressing) 设备几何配置。现代电脑基本都是用 LBA。与 CHS 不兼容。使用 CHS 这会导致 fdisk 格式化分区时起始字节偏移，即不是 2048。实际上 CHS 默认的起始字节是 1024，这导致文件系统不完整。电脑就识别不了。

## Service

Entware 的 service 是通过 `/opt/etc/init.d/rc.func` 来管理的。非常简陋。

它会在系统启动后自动执行 `/opt/etc/init.d/S99<service>` 下的脚本。

比如它创建 `/opt/etc/init.d/S99<service>` 可执行脚本。

```sh
#!/bin/sh

. /opt/etc/service/S99service.conf

ENABLED=yes  # 是否启动该服务
PROCS=cmd    # 这里的 cmd 是指服务的可执行程序
ARGS="$OPTIONS"
PREARGS=""
DESC=$PROCS
PATH=/opt/sbin:/opt/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

. /opt/etc/init.d/rc.func
```

`/opt/etc/service/S99service.conf` 里设置了 OPTIONS 变量。

`/opt/etc/init.d/S99<service> <action>` 可以管理服务。`<action>` 支持 `start`, `stop`, `restart`, `check` 等操作。
具体看 `/opt/etc/init.d/rc.func` 里的内容。

### 服务配置

比如要修改 dnsmasq 的服务配置。不建议直接修改 `/etc/dnsmasq.conf`。因为 /etc 目录都是在 tmpfs 下的，重启路由器后文件就会重置。

所以把要修改的配置添加到文件 `/jffs/configs/dnsmasq.conf.add`。如果要替换整个 `/etc/dnsmasq.conf`，可以把内容写到 `/jffs/configs/dnsmasq.conf`。因为梅林固件会重新生成 `/etc/dnsmasq.conf` 的内容。（注意：你需要确保在梅林系统设置里开启了「Enable JFFS custom scripts and configs」选项）

详见 [Custom config files](https://github.com/RMerl/asuswrt-merlin.ng/wiki/Custom-config-files)。

使用 `service restart_dnsmasq` 重启 dnsmasq 服务，它会重新生成 `/etc/dnsmasq.conf` 文件内容。

梅林固件官方文档上没有写。但是可以从 [src/router/services.c](https://github.com/RMerl/asuswrt-merlin/blob/master/release/src/router/rc/services.c) 源码里找到。`start_`, `stop_`, `restart_` 等函数。

## logger

logger 是系统程序 `/usr/bin/logger`。日志文件在 `/tmp/syslog.log` 和 `/jffs/syslog.log`。

## nvram

nvram 全名是 Non-Volatile RAM。在 OpenWrt 里是用了 Flash ROM 最后的 64K 区块，用來存储一些环境参数。OpenWrt 通过这些参数来配置网络。

- `nvram show` 展示键值对
- `nvram set key=value` 设置键值对
- `nvram unset` 删除键值对
- `nvram commit` 持久化保存。如果没有 commit，重启设备后，之前的设置会重置。

## 更新 dhcp hosts

除了 WebUI 上更新，还可以使用命令行更新，登录到路由器后使用 `nvram` 命令。

```sh
# 查看你当前的配置并做相应的修改。
nvram show dhcp_staticlist

# 每个地址的格式 `<mac_address>ip>>host_name`
nvram set 'dhcp_staticlist=<1A:3B:4C:5D:6E:7F>192.168.1.10>>A01<2A:3B:4C:5D:6E:7F>192.168.1.10>>A02'

# 持久化保存修改
nvram commit
```
