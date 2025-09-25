---
title: usbipd 与 Windows WSL
---


usbip 是 usbip 客户端。usbipd 是 usbip 服务端。[usbipd-win](https://github.com/dorssel/usbipd-win) 是 windows 平台专用的 usbip 服务端程序。它是 C/S 架构。

它让 Windows 宿主机与 WSL 通过 IP 共享本地的 USB 设备。安装 usbipd 前需要升级 wsl2 版本 `wsl --update`。

本文参考自[这个讨论](https://github.com/adoyle-h/my-development-tools/discussions/8)。

## 当 usbipd-win 无法与 WSL 搭配使用

排查问题列表：

1. 使用 usbipd **对于 wsl2 版本有要求**，使用前可能需要升级 wsl2 版本 `wsl --update`，参考[官方 Wiki](https://github.com/dorssel/usbipd-win/wiki/WSL-support)。
2. windows 防火墙默认会阻止 WSL 访问宿主机。需要在 Windows Defender 防火墙里添加**入站规则**。
3. 启用 adb 之前，先在 WSL 里用 `lsusb` 命令看看是否识别了新的 usb 接口。
4. 如果以上都确保没问题，还是没法连通宿主机。可以排查电脑里安装的有关网络管理、监控、VPN 等应用。可能是它搞得鬼。之前我装了一个网络监控工具把我电脑的网络流量给劫持了，导致修改防火墙规则也不起作用。

## WSL 里 adb 无法连接设备

解决方法：先 `adb kill-server`，然后用 `sudo adb devices` 用 sudo 权限开启 adb server 是关键。之后就能正常连接了。参考 [issue](https://github.com/dorssel/usbipd-win/issues/60)。

当执行 `adb shell` 看到报错 `This adb server's $ADB_VENDOR_KEYS is not set` 时，去看一眼手机，要点授权后才能访问。需要 `adb kill-server` 重来一遍。
