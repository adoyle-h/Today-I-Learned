---
title: 运维小技巧
---


## 其他运维小技巧

- [硬件](./ops-tricks-hardwares.md)
- [网络](./ops-tricks-networks.md)

## 编辑文件

- 修改任何文件前, 备份该文件，文件名可以为 `${原文件名}_${年月日时分秒}.bak`
- 修改配置文件后，先检查 (lint) 配置内容有效性，后应用配置。
- 修改配置文件，注意检查系统重启后配置是否依然生效。

## 同步文件

用 rsync 或者 scp。

## 远程执行命令

`ssh <user>@<host> <command>`

## 挂载远端目录

用 NFS 客户端挂载目录。

用 [sshfs](https://github.com/libfuse/sshfs) 把远端目录挂载到本地。

`sshfs <user>@<host>:/path/to/folder /path/to/mount/point`

## 查看服务器性能

- top
- uptime
- free -m
- dmesg | tail
- pidstat 1
- iostat -xz 1
- vmstat 1
- mpstat -P ALL 1
- sar -n DEV 1
- sar -n TCP,ETCP 1

参考:
http://www.infoq.com/cn/news/2015/12/linux-performance
