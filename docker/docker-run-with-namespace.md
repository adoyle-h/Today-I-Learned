---
title: Docker Run With Namespace
created: 2021-11-12T17:06:12+0800
updated: 2021-11-12T17:06:12+0800
---


## 问题

做了一个 top 命令的 docker 镜像，那么如何用这个镜像查看宿主机的 top 信息呢？

## 答案

`docker run` 提供 [`--pid`](https://docs.docker.com/engine/reference/run/#pid-settings---pid) 参数来复用进程 namespace。

以现成的镜像 cmd.cat/top 为例。
`docker run --pid host -it --rm cmd.cat/top top` 就是显示宿主机的 top 信息。


还可以指定别的容器的，

```sh
# 启动一个 redis 容器
docker run -d --rm --name redis redis

# 监控 redis 容器的 top 信息
docker run -it --rm --pid container:redis cmd.cat/top top
```

还可以复用网络 namespace，来调试宿主机或者别的容器的网络。
使用 [`--net`](https://docs.docker.com/engine/reference/run/#network-settings) 和 [`--ipc`](https://docs.docker.com/engine/reference/run/#ipc-settings---ipc) 参数。

```sh
docker run -d --rm --name nginx nginx

# 查看 nginx 容器的网络信息
docker run -it --rm --net container:nginx cmd.cat/curl/ab/ngrep
```
