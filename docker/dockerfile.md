---
title: Dockerfile
---


## 制作镜像

必读:

- [Best practices for writing Dockerfiles](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)

参考:

- [phusion/baseimage-docker](https://github.com/phusion/baseimage-docker)


## Entrypoint 和 CMD

用数组形式的组合，其他的组合都不灵活。

```
ENTRYPOINT ["bash", "-c"]
CMD ["/home/user/bin/xxx"]
```

**（必须用双引号，不能用单引号。否则会出错）**

等价于 `bash -c /home/user/bin/xxx`。

这样编译出来的镜像，可以用 `docker run -it <image> bash` 方便进入 shell 进行调试。

## 默认 SHELL

在执行 RUN 时，默认 shell 是 sh 而不是 bash。这会导致必须使用 POSIX shell 语法，且无法使用 `source` 等 bash 内置命令。
有两种解决方案：

1. 避免使用 bash 语法和命令。
2. 使用 `SHELL ["/bin/bash", "-c"]` 来修改 Dockerfile 执行时的 SHELL。`SHELL` 指令会影响 `RUN`, `CMD`, `ENTRYPOINT` 这三个指令的执行。[参考链接](https://docs.docker.com/engine/reference/builder/#shell)。

默认的 shell 是 `["/bin/sh", "-c"]` (Linux)，与 `["cmd", "/S", "/C"]` (Windows)。

若使用 `SHELL` 修改默认 shell 需要注意当前镜像内有无对应的 shell 程序。
比如 alpine 镜像就没有预装 bash，所以执行 `SHELL ["/bin/bash", "-c"]` 后会报错找不到 `/bin/bash` 文件。

## 条件判断用 `[ ]` 不要用 `[[ ]]`

因为在执行 RUN 时，默认 shell 是 sh 而不是 bash。

执行 `RUN if [[ -n "true" ]]; then echo abc > abc ; fi` 并不会创建文件 abc，也不会报错。

需要改写成 `RUN if [ -n "true" ]; then echo abc > abc ; fi` 才正确执行。

## 减少镜像体积的方法


- 通用方法
  - [multi-stage build](./multi-stage-build.md)
- ubuntu 镜像
  - `RUN apt update && apt install -y --no-install-recommends CMD && rm -rf /var/lib/apt/lists/*`
- alpine 镜像
  - `RUN apk update && apk add --no-cache CMD`

## dockerfile 支持 heredoc

```dockerfile
RUN <<EOF
echo "Hello" >> /hello
echo "World!" >> /hello
EOF

RUN <<EOF
apt-get update
apt-get upgrade -y
apt-get install -y ...
EOF

RUN <<EOF
#!/usr/bin/env python3
with open("/hello", "w") as f:
    print("Hello", file=f)
    print("World", file=f)
EOF

RUN python3 <<EOF
with open("/hello", "w") as f:
    print("Hello", file=f)
    print("World", file=f)
EOF

RUN python3 <<EOF > /hello
print("Hello")
print("World")
EOF
```

```dockerfile
COPY <<EOF /usr/share/nginx/html/index.html
(your index page goes here)
EOF

COPY <<robots.txt <<humans.txt /usr/share/nginx/html/
(robots content)
robots.txt
(humans content)
humans.txt
```

详见 https://www.docker.com/blog/introduction-to-heredocs-in-dockerfiles/

注意：在 heredoc 里，前一行命令失败会继续执行下一行。建议每个 heredoc 都加上 `set -o errexit -o nounset -o pipefail`。

```dockerfile
RUN <<EOF
set -o errexit -o nounset -o pipefail
echo 1
non-existed-command
echo 2
EOF
```
