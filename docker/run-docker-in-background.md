---
title: 在后台运行 docker 容器且不会自动退出
created: 2016-11-13T00:08:29+0800
updated: 2016-11-13T00:08:29+0800
---


因为 docker 启动容器后，一旦命令完成就会自动退出容器。

比如我想在后台运行 alpine 容器，可以执行下面这句：

`docker run --name alpine -d alpine tail -f /dev/null`

之后就可以通过 `docker exec -it alpine /bin/sh` 在容器里进行操作了。
