# Device Mapper

Device Mapper 是 Linux 内核提供的一种从逻辑设备到物理设备的映射框架机制。
在该机制下，用户可以很方便的根据自己的需要制定实现存储资源的管理策略，Linux 下的逻辑卷管理器如 LVM (Linux Volume Manager)、EVMS (Enterprise Volume Management System)、dmraid (Device Mapper Raid Tool) 等都是基于该机制实现的。

## 概念

## udev

- `udevadm info -a -p DEVPATH` DEVPATH 是 /sys/ 开头的设备路径
- `udevadm info -a -n /dev/xxx`
- `udevadm monitor` 监听设备变化

## /etc/udev/rules.d/*.rules

根据获取的设备信息，编写 udev 规则。规则通常保存在 /etc/udev/rules.d 目录下的文件中。这些文件的名称应该是以两位数字开头，后接描述规则的文本，扩展名为 .rules。数字表示规则的优先级，数字越低，优先级越高。

```sh
sudo udevadm control --reload
sudo udevadm trigger
```

## 命令

- dmsetup
