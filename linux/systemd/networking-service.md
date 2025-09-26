---
title: networking.service
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


networking.service 管理 `/etc/network/interfaces` 里配置的网络接口。

通过查看 `/lib/systemd/system/networking.service`。

- `ExecStart=/sbin/ifup -a --read-environment` 使用 `ifup -a` 启动所有标记成 `auto` 的网络接口。
- `ExecStop=/sbin/ifdown -a --read-environment --exclude=lo`
