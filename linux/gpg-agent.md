---
title: gpg-agent
created: 2023-07-05T11:32:57+0800
updated: 2023-07-05T11:32:57+0800
---


`gpg-agent.conf` 是 gpg-agent 的配置文件。

`gpgconf --kill gpg-agent` 重启 gpg-agent。
修改 `gpg-agent.conf` 如果没生效，试试 `gpg-connect-agent reloadagent /bye`。

## 修改 pinentry-program

pinentry 是用来让用户输入密码的，跟 gpg 交互。

```
# gpg-agent.conf

# pinentry-program 的值必须是完整路径，不能是文件名。通常你可以选下面两个程序之一
# - pinentry-tty 普通的文本交互
# - pinentry-curses 弹窗交互
# 注意，不同系统，路径可能不一样。
pinentry-program /usr/local/bin/pinentry-tty
```

## gpg-agent 密码缓存

可以修改每次密码输入的间隔时间。

```
# gpg-agent.conf

default-cache-ttl 43200
max-cache-ttl 43200
```

# gpgconf

`gpgconf --help` 查看帮助

# pinentry

pinentry 的启动依赖 `export GPG_TTY` 变量，找不到 tty，它会报错导致 gpg 签名或者加密失败。

# KeyServer

推荐的服务

- [hkps://keys.openpgp.org](https://keys.openpgp.org)
- https://keyserver.ubuntu.com/
- https://keys.mailvelope.com/

已废弃的服务

- https://sks-keyservers.net
- https://keys.gnupg.net

在 ~/.gnupg/gpg.conf 配置 KeyServer。

