---
title: 使用 U 盘安装系统
created: 2025-07-05T14:08:51+0800
updated: 2025-07-05T14:08:51+0800
---


1. 准备 U 盘。
2. 准备系统的 ISO 镜像。
3. (可选) 准备 PE Live CD 镜像，用来救援系统。

## 准备 U 盘

准备 1~2 个 32GB 以下的 U 盘。**注意不能超过 32GB**，因为有很多主板的 BIOS 系统识别不了 32GB 以上的 U盘。U盘推荐带读写指示灯的，可以观察安装是否卡在读写。

## 下载镜像

以 [debian](https://www.debian.org/CD/http-ftp/) 为例，ISO 镜像分 CD/DVD/BD。

- CD 镜像文件最小，存储了最精简系统，很多东西需要通过网络来安装。
- DVD 镜像文件 4GB 左右大小，覆盖了日常所需。但在安装过程中也需要连接网络安装 ssh server 和一些基础软件。
- BD 是最全也是最大的镜像，一般用于离线环境安装。

选一个镜像即可。

在中国镜像站下载 ISO 镜像。同时到官网下载 SHA512SUMS.txt 文件。
两个文件放在同一个目录下，使用命令 `sha526sum -c ./SHA512SUMS.txt ./debian.iso` 校验 ISO 镜像是否有被篡改。

### (可选)准备 PE 镜像

准备一个 PE Live CD 镜像，用来救援系统。

- Windows 系统用 [微 PE](https://www.wepe.com.cn/)，集成了很好用的工具。
- Linux 系统用 [SystemRescue](https://www.system-rescue.org/): 基于 Arch Linux，预装了一堆[系统工具](https://www.system-rescue.org/System-tools/)。用于系统恢复和硬盘处理。是 Live CD，开箱即用。启动默认进入终端，输入 `startx` 会进入图形化界面。

## 制作启动盘

制作启动盘的软件有几个选择：

- [etcher](https://github.com/balena-io/etcher): 傻瓜式操作，不可配置。支持在 Windows/MacOS/Linux（不支持命令行）制作启动盘。
- [Ventoy](https://github.com/ventoy/Ventoy): 支持多个不同类型的镜像共存。只支持在 Windows/Linux/虚拟机 制作。
- [rufus](https://github.com/pbatard/rufus) 只支持在 windows 电脑制作。可配置项比较多。

## 安装系统

1. 把 U 盘插入电脑。
2. 启动电脑，按键进去 BIOS 系统，不同电脑进入 BIOS 的按键不一样。
3. 调整 BIOS 的 boot 启动顺序，把 USB 放到第一位。保存重启电脑。
4. 重启后自动进入U盘启动安装流程。
