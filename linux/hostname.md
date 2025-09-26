---
title: Hostname in Linux
created: 2018-09-29T00:06:41+0800
updated: 2018-09-29T00:06:41+0800
---


`hostnamectl status` 可查看当前主机信息。

## 修改 hostname

- 临时修改：`hostname new-name`
- 永久修改: `hostnamectl set-hostname new-name` 或者修改 /etc/hostname 文件。

hostname 定义在以下这些文件

- `/etc/hosts` for networking
- `/etc/hostname` : This will be read by boot scripts on boot time and set its value.
- `/proc/sys/kernel/hostname` : Current hostname.
- `/etc/sysconfig/network` : Networking (HOSTNAME=”server1″ parameter)

修改文件后需要重启系统。

### 参考文章

- https://kerneltalks.com/linux/all-you-need-to-know-about-hostname-in-linux/ ([链接备份](https://web.archive.org/web/20230602152904/https://kerneltalks.com/linux/all-you-need-to-know-about-hostname-in-linux/))
- https://jaminzhang.github.io/linux/deep-understanding-of-linux-hostname/

## 关于 FQDN

FQDN 定义: https://www.wikiwand.com/en/Fully_qualified_domain_name

python 2.x 中 socket 库 `socket.getfqdn()` 调用的是 `hostname --all-fqdsn`。可能会有坑。

参考 Issue: https://bugs.python.org/issue5004
