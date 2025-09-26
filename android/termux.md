---
title: Termux
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


Termux 是 Android 手机上的一个终端 App。
不用 root 手机，普通权限就能很方便地使用了。
如果有 root，甚至可以[手机里跑 Docker](https://gist.github.com/FreddieOliveira/efe850df7ff3951cb62d74bd770dce27)。

## 基本设置

- 执行 `termux-change-repo` 设置镜像源，可以选 Cloudflare 源或者最下面四个国内高校的源，速度比较快。
- 执行 `termux-setup-storage` 创建 `~/storage` 目录，用于访问手机内的存储文件。
- 修改 `~/.termux/termux.properties` 文件可以设置底下的快捷按键和开启其他功能。
- 按 `ctrl`-`alt`-`+` 或者 `ctrl`-`alt`-`-` 来调整字体大小。
- 安装 [termux-style](https://github.com/adi1090x/termux-style)，设置终端样式和字体
- 安装 [termux-services](https://github.com/termux/termux-services)，支持服务管理。
  - 服务放置在 $SVDIR 指向的目录
  - 但创建服务很麻烦得创建一堆文件。

然后看一遍文档 https://wiki.termux.com/wiki/Getting_started

## 包管理器

Termux 装有 pkg、apt、dpkg。pkg 是官方推荐的包管理器。
apt、dpkg 和 Debian 的一模一样，尽量少做修改，只用来查询。

## 学习资料

- https://p3terx.com/archives/termux-tutorial-1.html
- https://www.sqlsec.com/2018/05/termux.html
- https://github.com/myfreess/Mytermuxdoc
- https://wiki.termux.com/wiki/Main_Page

## 在 Android 5/6 安装 Termux

根据[官方 WIKI](https://github.com/termux/termux-app/wiki/Termux-on-android-5-or-6) 可知，它在 [Github Workfloww](https://github.com/termux/termux-app/actions/workflows/debug_build.yml?query=branch%3Amaster+event%3Apush) 里编译了支持 Android 5/6 的 Termux App。

点进任意成功的 build。在 Artifacts 有列出所有的构建结果文件。选择文件名包含 `android-5` 的文件，支持 Android 5 或 Android 6。

## 修改 DNS 设置

截止 2024/04/18，我使用的 v0.118.0 版本的 Termux，默认 DNS 是 8.8.8.8，并非当前系统所设置的 DNS。
并且也不存在 /etc/resolv.conf 文件。

解决方法：

1. `pkg install resolv-conf` 确保已安装 resolv-conf 包。
2. Termux 使用的 resolv.conf 路径在 `/data/data/com.termux/files/usr/etc/resolv.conf`，直接修改内容即可，不需要 root 权限。

## chmod +x 无用

有时候 `chmod +x` 让文件可执行，虽然命令没报错，但是脚本依然还是不可执行的。

这是正常的。当文件存储在安卓系统的外部存储中，即 /storage/emulated/0。无法赋予可执行权限。

因为 /storage/emulated 是用 fuse 文件系统挂载的。在 termux 中执行 `mount | grep storage` 可以看到，它的挂载参数有 noexec。这代表着外部存储文件没有可执行权限。
如果不 root 手机，则无法修改挂载选项。
