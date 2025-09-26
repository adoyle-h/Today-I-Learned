---
title: linuxserver 镜像与 rootless docker
created: 2025-07-05T14:08:51+0800
updated: 2025-07-05T14:08:51+0800
---


linuxserver 的所有镜像通常[使用 PUID 和 PGID 环境变量来控制进程的 uid 和 gid](https://docs.linuxserver.io/general/understanding-puid-and-pgid/)。为了避免挂载宿主机的 local volume 时，文件的 uid/gid 权限问题。
注意：linuxserver 的所有镜像不使用 `docker run --user` 参数或者 docker-compose 的 `user: uid:gid`，这是为了兼容历史设计。

但是当用户在 rootless docker 里运行 linuxserver 镜像，就可能会出现很多问题。PUID、PGID 的控制可能会失效。文件权限问题会再次出现。以及其他问题：容器中的 Custom Services、Custom Scripts 都可能不会运行。

所以尽量不要在 rootless docker 中运行 linuxserver 镜像！

详见 https://docs.linuxserver.io/misc/non-root/
