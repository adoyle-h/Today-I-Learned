# Device Mapper

Device Mapper 是 Linux 内核提供的一种从逻辑设备到物理设备的映射框架机制。
在该机制下，用户可以很方便的根据自己的需要制定实现存储资源的管理策略，Linux 下的逻辑卷管理器如 LVM (Linux Volume Manager)、EVMS (Enterprise Volume Management System)、dmraid (Device Mapper Raid Tool) 等都是基于该机制实现的。

## 概念

## udev

- `udevadm info -a -p DEVPATH` DEVPATH 是 /sys/ 开头的设备路径
- `udevadm info -a -n /dev/xxx`
- `udevadm monitor` 监听设备变化

## 命令

- dmsetup
