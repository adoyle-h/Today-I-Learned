---
title: postgres 与 rootless docker
created: 2025-10-27T12:43:07+0800
updated: 2025-10-27T12:43:16+0800
tags: []
---


当使用 rootless docker 时，挂载本地目录 ./postgres/data 到 postgres 容器，容器启动时会有权限问题。

```yaml
 pg:
   image: postgres:16
   restart: unless-stopped
   # user: 1000:1000
   volumes:
     - ./postgres/data:/var/lib/postgresql/data
```

容器内的 postgres 用户的 uid:gid 是 70:70。那么 postgres 用户映射到宿主机的 uid:gid 则是 100069:100069。

你无法保证 ./postgres/data 是宿主机的 uid:gid。一旦要挂载本地目录到 postgres 容器内 /var/lib/postgresql/data，唯一的解决方法就是本地目录的 uid:gid 是 100069:100069。

有几个原因：

1. postgres 进程不允许用户以 uid=0 启动。
2. 在 postgres 镜像的 entrypoint 是 /usr/local/bin/docker-entrypoint.sh 。
  - 在这个脚本找到 `exec gosu postgres "$BASH_SOURCE" "$@"` 这行，会发现如果当 postgres 的 uid=0 时，会在这行陷入死循环。

虽然 postgres 官方给出了 [3 种解决方法](https://github.com/docker-library/docs/blob/master/postgres/README.md#arbitrary---user-notes)，第二种重新挂载 /etc/passwd 是解决不了的。因为修改 /etc/passwd 无非是修改 postgres 用户的 uid 和 gid。
在 rootless docker 中，如果要挂载宿主机目录进去，在容器内视角这个目录权限就是 uid:gid=0:0 的。
然而原因 1 与原因 2 就注定不能让 postgres 用户的 uid 为 0。

第一种 nss_wrapper library 的方式我没试过。第三种方法跟我想挂载到本地指定路径的目标冲突。
