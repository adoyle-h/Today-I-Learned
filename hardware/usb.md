---
title: USB
---


## USB 型号

![图片](https://corp.adata.com/support/quiktips/images/knowledge/04/article_04_P02.jpg)

- USB 1.0
  - 速度: 1.5 Mbps (0.1875 MB/S)
- USB 1.1
  - 速度: 12 Mbps (1.5 MB/S)
- USB 2.0
  - 速度: 480 Mbps (60 MB/S)
  - 接口: Type-A, Type-B, Mini-A, Mini-B, Mirco-A, Mirco-B
- USB 3.0 (之后改名叫 USB 3.1 Gen1, 现在改名叫 USB 3.2 Gen1)
  - 速度: 5 Gbps (625 MB/S)
  - 接口: Type-A, Type-B, Mini-A, Mini-B
- USB 3.1 Gen2 (现在改名叫 USB 3.2 Gen2)
  - 速度: 10 Gbps (1250 MB/S)
  - 接口: Type-C
- USB 3.2 (现在改名叫 USB 3.2 Gen2x2)
  - 速度: 20 Gbps (2500 MB/S)

## 查看电脑的 usb 接口信号

- windows 系统：安装 [Windows SDK](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/usbview)。其中有个 USBView 很好用。
- linux 系统：`lsusb -t | grep 'root hub'`

## 查看已连接的 USB 设备的 usb 型号

`lsusb -t` 仅列出已连接的 USB 设备。根据显示的速度判断型号。

## USB-IF 认证

https://www.enablingusb.org/certification-chinese

## Linux 用命令行安全拔出 USB 设备

假设 usb 挂载路径是 `/mnt/usb`。

```sh
# 把缓存写入块存储
sudo sync
# 终止访问该挂载点的进程
sudo fuser -km /mnt/usb
# 拆卸挂载
sudo umount /mnt/usb
```

或者，使用 `eject` 命令。但有些系统不自带命令，需要自己安装。而且只有支持 `eject` 命令的设备才会响应，不一定所有 usb 设备都支持。
