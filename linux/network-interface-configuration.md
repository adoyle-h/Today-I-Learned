---
title: 网络接口配置 (ifcfg)
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 常用命令

- `ifup $interface` 启动网络接口
- `ifdown $interface` 关闭网络接口

- 配置文件看 `/etc/network/interfaces`，它一般会引用 `/etc/network/interfaces.d/` 目录下的文件。

## 修改配置后检查

当你修改了 `/etc/network/interfaces` 或者 `/etc/network/interfaces.d/` 目录下的文件。需要检查是否有语法错误。可以这么做。

假设修改的是 eth0 接口配置。执行 `sudo ifup --no-act eth0` 检查。如果有错，会打印具体错误。

如果 eth0 已经启动，当没有错时则会显示 `ifup: interface eth0 already configured`。

如果 eth0 是新的接口，没有错时会显示

```
run-parts --exit-on-error /etc/network/if-pre-up.d

CLIENT="-i";  dhclient -4 -v $CLIENT -pf /run/dhclient.eth0.pid -lf /var/lib/dhcp/dhclient.eth0.leases -I -df /var/lib/dhcp/dhclient6.eth0.leases eth0
run-parts --exit-on-error /etc/network/if-up.d
```


## 参考

- https://wiki.debian.org/NetworkConfiguration
- [/etc/network/interfaces Ubuntu Linux networking example](https://archive.ph/BqbXw)
