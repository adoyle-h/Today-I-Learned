---
title: 在虚拟机里安装 Windows 11
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 下载 ISO 镜像

https://next.itellyou.cn/ 或者 https://www.xitongku.com/

如果是苹果芯片的 Mac 电脑，需要下载 ARM64 版本的。

消费者版本和商业版的界面和功能都不一样。一般选消费者版本。

## 虚拟机软件

我用的 vmware fusion。

## 安装可能遇到的问题

### start pxe over ipv4

在启动时根据提示立刻按键盘，否则会看到 `start pxe over ipv4`。

### 无法连接网络

按 `shift + F10` 可打开命令提示符窗口，在这个窗口内输入 `OOBE\BYPASSNRO` 命令使用开箱模式。系统会自动重启，跳过按钮。

### 安装 VMWare Tools

不要在安装系统过程中安装 VMWare Tools。在安装完系统后进入系统后点安装 VMWare Tools。

挂载 VMWare Tools 光盘后双击 setup 发现无法启动。打开 Windows 启动器（那个放大镜图标），搜索 PowerShell，右键点击用管理员身份运行。
输入 `Set-ExecutionPolicy RemoteSigned` 命令。然后选全是。然后执行 `D:\setup.ps1` 安装即可。

### 没有 Microsoft Store 应用商店

暂时不知道。
