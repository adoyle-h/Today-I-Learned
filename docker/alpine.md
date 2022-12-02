## Alpine 镜像

### apk

- `apk add --no-cache <pkg-name>` 不留缓存安装

### 常用包

搜索: https://pkgs.alpinelinux.org/packages

与 `build-essential` 类似的包，提供编译工具。`alpine-sdk` 或 `build-base`。参考这个 [issue](https://github.com/gliderlabs/docker-alpine/issues/24)

`apk add binutils`

### 根据文件查找包

比如缺失文件 `ld-linux-x86-64.so.2`，可以到 https://pkgs.alpinelinux.org/contents 找到对应的包。

https://pkgs.alpinelinux.org/contents?file=ld-linux-x86-64.so.2

### 依赖 glibc 的程序不要使用 alpine 镜像

当前在 alpine 镜像安装 glibc 的方案有两个，

- `apk add gcompat`，源码 https://git.adelielinux.org/adelie/gcompat 。问题也很多，缺失文件或者缺失符号。比如 `fcntl64: symbol not found`。
- sgerrand 提供了 glibc 在 alpine 的编译方案，https://github.com/sgerrand/alpine-pkg-glibc 。但是[问题太多了](https://github.com/sgerrand/alpine-pkg-glibc/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)，各种缺失文件与文件路径不对。

也可以使用 musl libc 代替 glibc，`apk add musl`，但似乎不能完全兼容。

## Alpine 的坑

- [../shell/bash-docker-image-has-bug.md](../shell/bash-docker-image-has-bug.md)
