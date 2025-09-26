---
title: 在 alpine 中找不到 setup-apkcache 等 setup-* 命令
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


如果你用的是 docker-alpine，这是正常情况。参见这个 [issue](https://github.com/gliderlabs/docker-alpine/issues/196)。

解决方法：执行 `apk add alpine-conf` 来安装这些脚本。
