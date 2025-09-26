---
title: 苹果芯片的 Mac 电脑构建 x86 镜像
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


当使用苹果芯片的 Mac 电脑，docker build/pull/run 默认操作的都是 arm64 架构的镜像。

但某些时候会遇到问题，比如 gcc-multilib 和 g++-mulitlib 这个交叉编译工具就不提供 arm64 架构的程序，只能在 x86 环境安装使用。因此在苹果芯片的 Mac 电脑的容器里执行 `apt install gcc-multilib` 就会失败，报错说找不到这个包。

解决方法很简单，加上 `--platform linux/amd64` 参数即可。

- `docker run -it --rm --platform linux/amd64 alpine uname -a`
- `docker build --platform linux/amd64 .`
