---
title: Podman
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## podman 内部结构

- 容器
  - [conmon](https://github.com/containers/conmon) 是容器守护进程，负责一对一监控和管理每个 podman 容器
  - [runc](https://github.com/opencontainers/runc) 负责提供容器运行时环境。用 Go 语言实现的 OCI
    - [crun](https://github.com/containers/crun) 功能跟 runc 一样，只是用 C 语言实现的 OCI
    - [youki](https://github.com/containers/youki) 功能跟 runc 一样，只是用 Rust 语言实现的 OCI
- 镜像
  - [skopeo](https://github.com/containers/skopeo) 负责与 images registry 交互。用来 pull/push/管理镜像
  - [buildah](https://github.com/containers/buildah) 负责构建镜像
- 存储
  - [storage](https://github.com/containers/storage) 负责管理文件系统的 layers，包括容器 layer 和镜像 layer
    - [fuse-overlayfs](https://github.com/containers/fuse-overlayfs) An implementation of overlay+shiftfs in FUSE for rootless containers
- 网络
  - [netavark](https://github.com/containers/netavark) 负责管理容器网络

podman 所有组件的源码都在 https://github.com/orgs/containers/repositories?type=source

podman 没有 daemon，一个 podman 进程管理一个容器。docker 有 daemon，是 CS 结构。

容器、镜像、volume 等数据存储在 `/var/lib/containers/` 目录。

## podman rm -f 容器后，进程可能仍存在

`podman rm -f` 只是删除了容器自身的数据，进程仍有可能存留。ps 看一下，如果还在就需要手动 kill 进程。
