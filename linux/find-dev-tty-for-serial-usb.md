---
title: 查找 USB 串口设备对应的是哪个 /dev tty 文件
created: 2023-09-20T15:22:00+0800
updated: 2023-09-20T15:22:00+0800
---


有两种方法。

## 方法一

串口设备会在 `/dev/serial/` 目录下生成一个软链接列表。可以在 /dev/serial/ 目录下的 by-path/ 或 by-id/ 或 by-label/ 或 by-uuid/ 子目录里找到对应的 tty 文件。

比如我有一个 zigbee router USB dongle。

```sh
$ ls -l /dev/serial/by-path/platform-xhci-hcd.3.auto-usb-0\:2\:1.0
lrwxrwxrwx 1 root root 13  7月 13 00:00 /dev/serial/by-path/platform-xhci-hcd.3.auto-usb-0:2:1.0 -> ../../ttyACM0
$ ls -l /dev/serial/by-id/usb-1a86_USB_Single_Serial_550D016719-if00
lrwxrwxrwx 1 root root 13  7月 13 00:00 /dev/serial/by-id/usb-1a86_USB_Single_Serial_550D016719-if00 -> ../../ttyACM0
```

所以它对应的是 `/dev/ttyACM0`。

## 方法二

先通过 `lsusb` 列出 usb 设备列表。

```sh
$ lsusb
Bus 001 Device 003: ID 1a86:55d4 QinHeng Electronics USB Single Serial
Bus 001 Device 002: ID 0bda:0179 Realtek Semiconductor Corp. RTL8188ETV Wireless LAN 802.11n Network Adapter
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

再通过 `dmesg` 查找内核消息。

```
[    4.783976] usb 1-2: new full-speed USB device number 3 using xhci-hcd
[    4.798624] mmc0: new high speed SDIO card at address 0001
[    4.937059] usb 1-2: New USB device found, idVendor=1a86, idProduct=55d4, bcdDevice= 4.44
[    4.944033] usb 1-2: New USB device strings: Mfr=0, Product=2, SerialNumber=3
[    4.951137] usb 1-2: Product: USB Single Serial
[    4.955577] usb 1-2: SerialNumber: 550D016719
...
[   11.760637] cdc_acm 1-2:1.0: ttyACM0: USB ACM device
```

`cdc_acm` 是一个 Linux 内核模块，通常用于支持通过 USB 端口进行串行通信。它是 "Communication Device Class (CDC) Abstract Control Model (ACM)" 的缩写。

- Communications Device Class (CDC): 这是 USB 规范的一部分，定义了如何在通用串行总线（USB）上通信的设备应该如何工作。
- Abstract Control Model (ACM): 这是 CDC 规范中的一部分，它定义了一种通用模型，使得在 USB 设备和主机之间进行串行通信成为可能。这包括像调制解调器或网络设备这样的设备。
