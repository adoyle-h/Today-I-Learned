# sysctl

sysctl 是一种用于在运行时检查和更改内核参数的工具。sysctl 在 procfs 中实现，procfs 是位于/proc/的虚拟进程文件系统。

## sysctl 配置手册

https://sysctl-explorer.net/

## 修改配置后使之立刻生效

`sudo sysctl --system`

## ArchLinux 不识别 /etc/sysctl.conf

> 从版本 207 和 21x 开始，systemd 只会应用 /etc/sysctl.d/*.conf 和 /usr/lib/sysctl.d/*.conf 中的设置。 如果您自定义了 /etc/sysctl.conf，则需要将其重命名为 /etc/sysctl.d/99-sysctl.conf。 如果你原来有像 /etc/sysctl.d/foo 这样的配置，需要重命名为 /etc/sysctl.d/foo.conf。
> https://wiki.archlinuxcn.org/wiki/Sysctl#%E9%85%8D%E7%BD%AE
