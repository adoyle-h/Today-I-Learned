---
title: Docker for Mac 中磁盘文件占用过大
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


关联 [Issue](https://github.com/docker/for-mac/issues/371)。
[官方解释](https://docs.docker.com/docker-for-mac/faqs/#dockerraw-consumes-an-insane-amount-of-disk-space)。

即 Docker.qcow2 只增不减，上面的解决办法都会导致容器、镜像、Volume 被删光。
所以为了保留镜像，可以先 `docker save` 把镜像打包成 tar 包，然后 reset 后再用 `docker load` 把镜像装回去。
