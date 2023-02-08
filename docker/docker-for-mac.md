# docker for mac

> 在 2021 年 4 月时，Docker for Mac（Docker Desktop）发布了对 Apple Silicon 的实验性支持，它会使用 QEMU 运行一个 ARM 架构的 Linux 虚拟机，默认运行 ARM 架构的镜像，但也支持运行 x86 的镜像。

[为什么在 Apple Silicon 上装 Docker 这么难](https://juejin.cn/post/7068481074736660494)

## 修改配置导致 docker 无法启动

docker for mac 的配置在 `~/Library/Group\ Containers/group.com.docker/settings.json`，修复配置即可。
