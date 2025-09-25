---
title: docker for mac
---


> 在 2021 年 4 月时，Docker for Mac（Docker Desktop）发布了对 Apple Silicon 的实验性支持，它会使用 QEMU 运行一个 ARM 架构的 Linux 虚拟机，默认运行 ARM 架构的镜像，但也支持运行 x86 的镜像。

[为什么在 Apple Silicon 上装 Docker 这么难](https://juejin.cn/post/7068481074736660494)

## 修改配置导致 docker 无法启动

docker for mac 的配置在 `~/Library/Group\ Containers/group.com.docker/settings.json`，修复配置即可。

## 在 ARM 架构的 Docker for mac 里运行 AMD 架构的镜像，ctrl-c 失效

等待解决 https://github.com/docker/for-mac/issues/6082

解决方法：在别的窗口使用 `docker stop` 命令来关闭容器。或者到 Docker Desktop 里关闭容器。


## OrbStack

如果使用 Mac，推荐安装 OrbStack 代替 Docker Desktop。它更轻量级，可以创建虚拟机以及 Docker。

### OrbStack Linux

可以在终端使用 `orb` 命令进入虚拟机。

### OrbStack Docker

`orb config docker` 可以配置 docker。
或者编辑 ~/.orbstack/config/docker.json 文件。
修改后需要重启 docker。`orb restart docker`。

### docker pull image 使用代理

比如宿主机的代理程序暴露端口 7890，设置 `orb config set network_proxy http://localhost:7890`

详见 https://docs.orbstack.dev/machines/network#proxies


### OrbStack 目前存在的问题

- [挂载的文件会丢失 birth time](https://github.com/orbstack/orbstack/issues/2064)
