---
title: NFS
---


https://linux.die.net/man/5/nfs

## Operation not permitted 问题

当 `mount -o noresvport <nfs 服务>` 时，会碰到 `Operation not permitted` 问题，因为 nfs 默认配置选项是 `secure`，不允许客户端通过非特权端口访问。

如果客户端必须要 `mount -o noresvport` 访问，那么就需要 nfs 服务器配置允许非特权端口访问。需要修改 /etc/exports，设置 `insecure` 选项。

## /etc/exports

`/etc/exports` 是 nfs 服务端的配置。nfs 客户端不读这个配置文件。

`exportfs -s` 查看 nfs 服务已加载的配置情况。

修改 `/etc/exports` 文件不会自动应用到当前 nfs，需要通过 `exportfs -rv` 重载。


## NFS Kerberos


## /etc/idmapd.conf


## root 只能读，不能写

`root_squash` 是默认选项，root 用户会被映射成匿名用户，即客户端的 UID 与 GID 都会变成 nobody 用户的 UID 和 GID。

`no_root_squash` 选项，root 用户不会被映射成匿名用户。
