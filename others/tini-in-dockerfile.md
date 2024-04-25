# Dockerfile 里使用 tini

[tini](https://github.com/krallin/tini) 是专门给容器使用的 init 进程。

```dockerfile
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
```

当这么安装 tini 时，编译镜像后，运行镜像可能会遇到这种问题：

- `/tini: no such file or directory`
- `/tini: cannot execute: required file not found`

这有几种可能：

1. 没下载成功，检查镜像里是否存在 /tini 文件。
2. 编译镜像的架构与下载的 tini 文件的架构不一致。
  - tinit 在 [releases 页面](https://github.com/krallin/tini/releases)发布了很多版本，默认的 tini 是 x86-64 的。下载后用 `file ./tini` 一看便知。
3. tini 依赖 libc。
  - 当你使用 alpine 作为 base image 时，默认是没有安装 libc 的。
  - 解决方案：用包管理器来安装 tini。或者下载 tini-static 版本。详见 https://github.com/krallin/tini#statically-linked-version
