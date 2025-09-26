---
title: docker 小技巧
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 避免总是用 sudo 以及 shell 补全不完整

针对 Linux 系统，非 root 用户总是要 sudo 来执行 docker 命令。
而且 `docker inspect <tab>` 没法补全，因为列出可选项需要去访问 docker，但此时没执行 sudo。

更好的方法是把当前用户加到 docker 组里。这样就可以通过 unix socket 来操作 docker。

执行 `usermod -a -G docker <当前用户名>`，然后重新登录用户使修改生效。

## 保持 shell 一直启动

ENTRYPOINT ["tail", "-f", "/dev/null"]

## 查看镜像每层执行了什么命令

这在缺失 Dockerfile 的情况下有一定帮助。

<!-- {% raw %} -->
`docker history --no-trunc --format '{{.CreatedBy}}' <image>`
<!-- {% endraw %} -->

因为 docker history 默认会裁减输出，所以要加上 `--no-trunc` 参数。

## docker 容器内无法执行 iptables

```sh
$ iptables -L
iptables v1.8.3 (legacy): can't initialize iptables table `filter': Permission denied (you must be root)
Perhaps iptables or your kernel needs to be upgraded.
```

需要创建特权容器才能执行相关命令，`docker run --privileged`

## docker format 的工具函数

比如查看可以输出哪些字段，用 `json`，例如
<!-- {% raw %} -->
`docker container ls --format='{{json .}}'`
<!-- {% endraw %} -->

https://docs.docker.com/config/formatting/

## 查看已退出的容器里的文件

```sh
# 先将容器导出成镜像
docker commit <container> <image>
# 再从镜像启动新容器
docker run --entrypoint sh --rm -it <image>
# 查看文件
```

## docker commit 会保存当前容器的 ENTRYPOINT 和 CMD

所以 docker commit 导出的镜像，跟原容器的镜像的 Dockerfile 设定的 ENTRYPOINT 和 CMD 可能是不一样的。

有 3 种解决方式解决这个问题。

其一，docker commit 支持 `--change` 参数，可以在导出镜像之前设定其他 Dockerfile 指令来覆盖当前容器的配置。

`$ docker commit --change='CMD ["apachectl", "-DFOREGROUND"]' -c "EXPOSE 80" c3f279d17e0a  svendowideit/testimage:version4`

其二，用 Dockerfile 基于 docker commit 导出的镜像，重新指定 ENTRYPOINT 和 CMD。

其三，docker run 时指定 --entrypoint 和 cmd。或者 docker-compose 里指定 entrypoint 和 command。
