---
title: 客户端连接多个 docker daemon
created: 2024-06-03T03:33:28+0800
updated: 2024-06-03T03:33:28+0800
---


如果主机同时运行着 rootless docker 和 rootful docker。

可以通过指定 DOCKER_HOST 环境变量或者 `docker -H` 参数，或者通过 docker context，连接对应的 docker daemon。

## DOCKER_HOST

```sh
# 指定 rootless docker
export DOCKER_HOST=unix:///run/user/$UID/docker.sock

# 指定 rootful docker
export DOCKER_HOST=unix:///var/run/docker.sock
```

## docker context

- `docker context --help` 查看子命令
- `docker context ls`
- `docker context use rootless`
- `docker context use default`
