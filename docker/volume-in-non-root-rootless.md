---
title: 在 rootless 容器中，用非 root 用户无法操作 volume 里的文件
---


## 问题描述

在 rootless 容器中，用非 root 用户对 volume 里的文件进行写操作，会提示 `Permission denied`。

详见 https://github.com/containerd/nerdctl/issues/2334

## 必要条件

1. rootless 模式。
2. 镜像的默认用户不是 root。
3. 用 `-v` 参数从主机挂载目录到容器。

我试了 docker v24.0.2，nerdctl v1.7.2，podman v4.0.1，结果都一样。

## 复现方法


0. Install rootless nerdctl.
1. Create a Dockerfile

```dockerfile
FROM alpine:3
RUN adduser -D admin
USER admin
WORKDIR /home/admin
```

2. Create a Makefile

```make
cat Makefile
.PHONY: build
build:
        @nerdctl build -t image-name .

.PHONY: run
run:
        @nerdctl run -it --rm -v $(PWD)/abc:/home/admin/abc image-name sh
```

3. `mkdir abc`
4. `make build` to build image
5. `make run` to create a container and enter the shell.
6. `touch ./abc/d`

```
touch: ./abc/d: Permission denied
```

## 失败方法

- `docker run --user 1000:1000` ❌ 无效
- `docker run --userns=keep-id` ❌ 目前 nerdctl 没 `--userns` 选项，docker 支持，但没有 keep-id 这个选项。podman 支持，但无效。
- `docker run --user 1000:1000 --userns=keep-id` ❌ 无效
- `docker run -v /xxx:/xxx:Z` ❌ 无效
- `docker run --user 1000:1000 --userns=keep-id -v /xxx:/xxx:Z` ❌ 无效

`--user` 的值是容器里的用户 `uid:gid`，可以在容器里执行 `id`，确认是不是 `uid=1000, gid=1000`。

## 解决方法

单独创建一个 volume。直接把文件写在 volume 里，不直接从宿主机挂载文件。

在目标容器启动之前，先用其他镜像挂载 volume，把文件放进去，用 `chown` 修改文件权限。然后把这个 volume 挂到目标容器里。
具体执行代码参考下面。

```sh
# docker 可以换成 nerdctl, podman
docker volume create vol
docker run --rm -v vol:/data alpine sh -c 'mkdir /data/abc && chown 1000:1000 /data/abc'
```

或者，可以复制宿主机的文件到容器的 volume 里。

```sh
docker run --name temp --rm -d -v vol:/data alpine sleep 30
docker cp ./config.yaml temp:/data/
```

可以进到容器看看 volume 里的文件，`docker run --rm -it -v vol:/data alpine:3`。
