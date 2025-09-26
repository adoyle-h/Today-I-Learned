---
title: nerdctl
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


[nerdctl](https://github.com/containerd/nerdctl) 是 Containerd 的上层封装工具。实现了 container、volume, network 的创建和管理。与它同层次的替代方案还有 `docker`、`podman`、`K8S`（K8S 的使用场景更复杂）。

## nerdctl 的组成

- 容器
  - Containerd
- 镜像
  - [BuildKit](https://github.com/moby/buildkit): for using `nerdctl build`. BuildKit daemon (`buildkitd`) needs to be running.
- 存储
- 网络
  - [CNI plugins](https://github.com/containernetworking/plugins): for using `nerdctl run`.
  - [CNI isolation plugin](https://github.com/AkihiroSuda/cni-isolation): for isolating bridge networks (`nerdctl network create`)
- 其他
  - [RootlessKit](https://github.com/rootless-containers/rootlesskit) and [slirp4netns](https://github.com/rootless-containers/slirp4netns): for [Rootless mode](https://docs.docker.com/engine/security/rootless/)

## data_root

data_root 是存储 nerdctl 数据的根目录。根据 nerdctl 的全局选项 (Global Flags) `--data-root` 指定。

其默认值是根据当前系统（linux，freebsd，windows）有区分，具体见[源码](https://github.com/containerd/nerdctl/tree/v0.14.0/pkg/defaults)。linux 系统下

data_root 是根据 nerdctl run --data-root 指定的路径。
linux 系统下，如果是 rootful 模式，默认值 `/var/lib/nerdctl`。如果是 [rootless 模式](https://rootlesscontaine.rs/getting-started/docker/)，默认值是 `<XDGDataHome>/nerdctl`。

## dataStore

dataStore 存储 nerdctl 的数据的目录。它的路径是 `dataStore=<data_root>/<addr_hash>`。

addr_hash 是计算 containerd.sock 文件路径的 sha256 值的前 8 个字符。具体计算方法如下：

`addr_hash=$(echo -n "/run/containerd/containerd.sock" | sha256sum | cut -c1-8)`

假设 addr_hash 值是 `1935db59`（通常都是这个，因为 containerd.sock 路径都是用默认的），data_root 值是 `/var/lib/nerdctl`，那么 dataStore 值就是 `/var/lib/nerdctl/1935db59`。

containerd.sock 文件路径可以在 config.toml（默认是 /etc/containerd/config.toml）里的 grpc.address 配置。

再来看 dataStore 下放了什么文件。

```sh
$ ls /var/lib/nerdctl/1935db59/
containers  etchosts  names  volumes
```

这四个目录分别是 nerdctl 所管理的容器、网络、容器名称、存储卷。
