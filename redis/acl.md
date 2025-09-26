---
title: Redis ACL
created: 2025-04-26T23:23:48+0800
updated: 2025-04-26T23:23:48+0800
---


## 常用命令

- `acl load` : 重新加载 acl 配置
- `acl cat` : 根据分类查看所有 acl 选项
- `acl list` : 查看所有用户的 acl 配置
- `acl log` : 查看被 acl 拒绝的操作日志

## aclfile

`aclfile /etc/redis/users.acl` 将用户、密码、权限设置写在 `/etc/redis/users.acl` 文件里。

文件修改过后，需要登录 redis，`auth` 命令登录管理员账户，然后执行 `acl load` 命令加载 acl 配置。重启容器好像不管用。

## 用 sha256 存储用户密码

避免在配置文件里存储明文密码。`#密码` 表示 sha256 加密后的密码。例如 `user adoyle on #sha256-encrypted-password`。

## No permissions to access a channel

Redis 7.0 起，`acl-pubsub-default resetchannels` 是默认选项。

`acl list` 可以看到用户的 acl 选项里多了一个 `resetchannels`，也就是说用户默认无法对 channel 进行 pub/sub 操作。

有 3 种解决方法：

1. 在 acl 配置里加上 `&*` 表示对所有 channel 都可以 pub/sub。比如 `user adoyle on #passwd &*`。或者 `&chan` 对某个 channel 进行 pub/sub 操作。 比如 `user adoyle on #passwd &chan1 &chan2`。
2. 使用 `auth setuser adoyle &chan` 命令对指定用户增加 acl 选项。
3. 在配置文件里设置 `acl-pubsub-default allchannels`，这样所有用户默认都可以对 channel 进行 pub/sub 操作。
