---
title: Device Mapper
---


Device Mapper 是 Linux 内核提供的一种从逻辑设备到物理设备的映射框架机制。
在该机制下，用户可以很方便的根据自己的需要制定实现存储资源的管理策略，Linux 下的逻辑卷管理器如 LVM (Linux Volume Manager)、EVMS (Enterprise Volume Management System)、dmraid (Device Mapper Raid Tool) 等都是基于该机制实现的。

## 概念

## udev

- `udevadm info -a -p DEVPATH` DEVPATH 是 /sys/ 开头的设备路径
- `udevadm info -a -n /dev/xxx`
- `udevadm monitor` 监听设备变化

## udev rule

根据获取的设备信息，编写 udev 规则。

自定义规则放在 /etc/udev/rules.d/*.rules
软件包以及系统自带的规则放在 /usr/lib/udev/rules.d/*.rules
若有同名规则，/etc/udev 的优先级更高。

.rules 文件的名称应该是以两位数字开头，后接描述规则的文本，扩展名为 .rules。数字表示规则的优先级，数字越低，优先级越高。


修改 rules 文件后，需要重载 udev。

```sh
sudo udevadm control --reload
sudo udevadm trigger
```

## 不允许在 udev 规则中访问网络或执行 mount

`man udev` 写着：

> Note that running programs that access the network or mount/unmount filesystems is not allowed inside of udev rules, due to the default sandbox that is enforced on systemd-udevd.service.

[arch linux 文档](https://wiki.archlinux.org/title/Udev#Mounting_drives_in_rules)也警告说不要在 udev 规则中调用 mount。

有两个原因：

1. 默认情况下，systemd 使用单独的 “mount namespace” 运行 systemd-udevd.service （参见 namespaces(7)）。这意味着 mounts 对系统的其余部分是不可见的。
2. 从 udev 启动的进程在几秒钟后被终止。对于 FUSE 文件系统，例如 NTFS-3G，mount 会启动一个用户空间进程来处理文件系统内部; 当这被终止时，如果你尝试访问文件系统，你会得到 Transport endpoint not connected 错误。

解决方法：使用 systemd-automount 或者 udisks2 来管理外接 USB 设备。

## 命令

- dmsetup
