---
title: 在 rootless podman 获取不到真实远端 ip
created: 2023-05-09T00:25:20+0800
updated: 2023-05-09T00:25:20+0800
---


## 问题

在 rootless podman 里运行 nginx 容器。nginx 访问日志里 `remote_addr`, `realip_remote_addr` 打印的都是容器所在的 ip，不是用户真实 ip。

## 解释

因为 podman 不支持。

详见 [issue: Rootless Nginx Wrong "remote_addr" while Rootful Nginx has correct "remote_addr"](https://github.com/containers/podman/issues/17765) 以及 https://github.com/containers/podman/issues/8193

## 解决方法

把 podman 升级到 4.4 之后版本，然后用 `--network pasta` 运行容器。（这个方法未验证是否可行，因为当前 debian 包管理的 podman 4.4 还不是稳定版）

## 其他

在[这个 PR](https://github.com/containers/podman/pull/16141) 中加入了 pasta 网络模式。用来代替 slirp4netns 实现 rootless 容器网络。

pasta 似乎很高效，具体详见 https://passt.top/passt/about/#pasta-pack-a-subtle-tap-abstraction
