---
title: Python Dockerfile
---


## 不要使用 Alpine 镜像

不要使用 Alpine 镜像，因为 [Using Alpine can make Python Docker builds 50× slower](https://pythonspeed.com/articles/alpine-docker-python)。
[编译 grpc 时很慢](https://github.com/grpc/grpc/issues/20493)，一直提示 `Building wheel for grpcio (setup.py): still running...` 等了很久才编译完。
这个 [issue](https://github.com/grpc/grpc/issues/11125) 说是 `manylinux1` 导致的问题。[解决方案](https://github.com/pypa/pip/issues/3969#issuecomment-247381915)没看懂。

## glibc 与 musl

Alpine 系统里编译代码使用的不是 glibc 而是 musl，就会导致编译出来的包依赖动态链接库 ld-musl-x86_64.so.1。
如果部署系统上没有它，会报错 `/lib/ld-musl-x86_64.so.1: bad ELF interpreter: No such file or directory`

参考[链接](https://cloud.tencent.com/developer/article/1536308)。
