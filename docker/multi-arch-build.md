---
title: 构建多架构镜像
created: 2023-02-08T18:12:13+0800
updated: 2023-02-08T18:12:13+0800
tags: [docker, build, buildx]
---


https://docs.docker.com/build/building/multi-platform/

为了同名镜像适配不同的操作系统，需要构建多架构镜像。
需要使用 `docker buildx`。buildx 会在指定构建器实例中构建镜像。

## docker buildx

https://docs.docker.com/build/buildkit/

在 docker 18.09 版本之后，用户可以使用 `docker buildx` 命令。

它有以下功能，

- 检测并跳过执行未使用的构建阶段
- 平行化构建独立的构建阶段
- 在两次构建之间，只递增传输构建环境中已更改的文件
- 检测并跳过传输构建环境中未使用的文件
- 使用具有许多新功能的 Dockerfile 前端实现
- 避免与其他API（中间镜像和容器）产生副作用
- 对你的构建缓存进行优先排序，以便自动修剪

BuildKit 默认为 Docker Desktop 上的所有用户启用。如果你已经安装了 Docker Desktop，你就不需要手动启用 BuildKit。
如果你在 Linux 上运行 Docker，你可以通过使用环境变量 `DOCKER_BUILDKIT=1`，或将 [BuildKit 作为默认设置](https://docs.docker.com/build/buildkit/#getting-started)来启用 BuildKit。

docker buildx commands:
  bake        Build from a file
  build       Start a build
  create      Create a new builder instance
  du          Disk usage
  inspect     Inspect current builder instance
  ls          List builder instances
  prune       Remove build cache
  rm          Remove a builder instance
  stop        Stop builder instance
  use         Set the current builder instance
  version     Show buildx version information

## builder

当构建器实例 (builder) 的 driver 是 `docker-container` 或者 `kubernetes` 时，可以构建多架构镜像。
driver=docker 时，只能构建当前系统架构的镜像。

默认的 builder 是 `docker` driver。你可以使用 `docker buildx ls` 和 `docker buildx inspect` 查看详情。

所以你要用 `docker buildx create` 创建自己的构建器实例。`--driver docker-container` 是默认参数，会创建一个基于 `moby/buildkit` 镜像的容器。在这个容器中构建多架构镜像。

- `docker buildx create --name $BUILDER --bootstrap --use` 创建 builder 实例，并使用这个实例。
- `docker buildx ls` 列出所有 builder 实例。
- `docker buildx use` 切换 builder 实例。
- `docker buildx inspect` 查看当前 builder 实例信息。

### builder 配置

当创建 `--driver=docker-container` 构建器后，在该实例里执行的构建操作，不会受到 docker 系统配置的影响。
比如 buildx pull 镜像时，不会受到系统配置的 registry mirror 的影响。

你可以在创建构建器时用 `--buildkitd-config` 参数指定配置，详见[文档](https://docs.docker.com/build/buildkit/configure/)。

### 中国环境下的 buildx 配置

由于 docker.io registry 已经被 GFW。pull/push image 都会失败。所以若想在中国环境下操作，有两种常见方案：

#### 使用镜像仓库

这种方法只适用于：只需要 pull image，不用 push image。

1. 准备可用的 registry mirror。例如 `mirror.docker.io`。
2. 当前目录下创建 config.toml 文件。内容为

    ```toml
    [registry."docker.io"]
      mirrors = ["mirror.docker.io"]`
    ```

3. 创建 builder: `docker buildx create --name $BUILDER --bootstrap --use --buildkitd-config=./config.toml`
4. 构建镜像 `docker buildx build`

#### 使用 http 代理

这种方法适用于：需要 push/push image。

1. 准备可用的 http 代理。
2. 创建 builder: `docker buildx create --name $BUILDER --bootstrap --use`
3. 构建镜像 `http_proxy=$http_proxy https_proxy=$http_proxy docker buildx build`

注意：如果你的 proxy 代理程序运行在本机上，`$http_proxy` 的值应该是 `http://127.0.0.1:$port`，而不是 `http://host.docker.internal:$port`。

注意：使用 `--driver-opt env.http_proxy` 创建的 builder 实测是无效果的: `docker buildx create --name $BUILDER --bootstrap --use --driver-opt env.http_proxy=$http_proxy --driver-opt env.https_proxy=$http_proxy`。

详见 https://github.com/moby/buildkit/issues/5839

## docker buildx build

`docker buildx build --platform linux/amd64,linux/arm64,linux/386,linux/arm/v7,linux/arm/v6 --push --tag owner/image:version .`

在这种情况下，它会建立一个清单 (manifest)，其中包含所有指定架构的镜像。
当你在 docker run 或 docker service 中使用这个镜像时，Docker 会根据节点的平台来挑选正确的镜像。

**注意**，不能分开使用 `--platform`，比如先执行 `docker buildx build --platform linux/amd64`，后执行 `docker buildx build --platform linux/arm64`。后面构建的镜像会覆盖之前的镜像，最终只会产生单架构的镜像。

**注意**，用户必须加上 `--push` 参数，它会自动 push 构建好的镜像到 docker hub。由于 docker buildx build 构建的多架构的镜像只会保留最后一份架构的镜像在本机，用户没法用 `docker push` 来提交多架构镜像。

详见 https://github.com/docker/buildx/blob/master/docs/reference/buildx_build.md

## TARGETPLATFORM 变量

`--platform` 传递的参数会自动注入到 TARGETPLATFORM 环境变量里。
方便在 [RUN heredoc](./dockerfile.md#dockerfile-支持-heredoc) 里使用条件判断。

```dockerfile
FROM alpine
ARG TARGETPLATFORM
RUN echo "I'm building for $TARGETPLATFORM"
```

详见 https://docs.docker.com/reference/dockerfile/#automatic-platform-args-in-the-global-scope
