---
title: systemd-resolved
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


systemd-resolved 是 systemd 的一部分，作为 systemd-resolved.service 启动。

## 当 nslookup 不起作用，但 resolvectl query 可以

用软连接替换 /etc/resolv.conf，使用 systemd-resolved 维护 DNS 配置。

```sh
$ sudo ln -fs /run/systemd/resolve/resolv.conf /etc/resolv.conf
$ ls -l /etc/resolv.conf
/etc/resolv.conf -> /run/systemd/resolve/resolv.conf
```

## resolvectl

resolvectl 解析主机名、IP地址、域名、DNS 资源记录、服务；内省及重新配置 DNS 解析器。

resolvectl 利用 systemd-resolved.service 系统服务解析主机名、IP地址、域名、DNS资源记录、服务。
默认情况下，参数列表将被视为域名/主机名的列表，程序的输出将是它们所对应的 IPv4 或 IPv6 地址。 如果参数符合 IPv4 或 IPv6 格式，那么表示反解析IP地址所对应的主机名。

- `resolvectl status` 查询设定。
- `resolvectl query $hostname` 类似 nslookup。
- `systemctl restart systemd-resolved.service` 更新 `/etc/systemd/resolved.conf`。
- `resolvectl flush-caches` 刷新 DNS 缓存。
- `resolvectl statistics` 查询统计。

## resolvconf

resolvconf 是一个兼容命令，通常是一个指向 resolvectl 软链接。resolvectl 将以受限的兼容模式运行，将所有数据推送到 systemd-resolved.service 服务中。类似 `dns` 或 `domain` 命令。systemd-resolved 是唯一支持 resolvconf 的后端。
