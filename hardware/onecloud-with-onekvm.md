---
title: '玩客云与 OneKVM'
created: 2025-11-06T18:49:24+0800
updated: 2025-11-08T21:17:55+0800
tags: []
---

## 前置知识

### 玩客云

- 晶晨 S805
- 板载 1G 内存，7G EMMC
- 2 个 USB，支持 OTG
- 1 个千兆网口
- 1 个 HDMI 接口
- 1 个 SD 卡槽

### [OneKVM](https://github.com/mofeng-git/One-KVM)

- 基于 [PiKVM](https://github.com/pikvm/pikvm) 项目二次开发的 DIY IP-KVM 解决方案。适配了很多国内廉价小主机。

## 刷机

### 准备

玩客云，电源适配器，USB 双公头线 1 根，HDMI 转 USB 线（注意不是 USB 转 HDMI 线）。windows 电脑。



### 刷机流程

不用拆机。刷机很简单。

1. 在 windows 电脑安装 amlogic usb burning tool。
2. 下载 onekvm 镜像。One-KVM_by-SilentWind_Onecloud_******.burn.img.xz。解压缩。
3. 玩客云 USB1 连 windows 电脑，打开 amlogic usb burning tool。在接通电源前，用牙签按住 reset 键，然后接通电源。usb burning tool 会显示连接成功。
4. 勾选擦除 Flash 和 bootloader。载入解压缩出来的 img 镜像。然后点开始。

## 使用

onekvm 通过 DHCP 获得 IP。需要到路由器查看名为 onecloud 的 IP。然后在浏览器里访问 IP。默认用户名/密码是 admin/admin。

ssh 默认用户名/密码是 root/1234。登录 ssh 后会重新设置 root 密码并且创建新用户。

浏览器的用户和主机的用户不一样。创建浏览器的登录用户： `kvmd-htpasswd add adoyle`。`kvmd-htpasswd del admin`。

浏览器里也有终端可以访问 onecloud 主机。执行 `su root` 可以切换到 root 用户。

### 开启两步验证

ssh，然后执行 `kvmd-totp init` 生成密钥并开启两步验证。
