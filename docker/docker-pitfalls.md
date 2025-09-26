---
title: Docker 的坑
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## COPY/ADD 的目标路径不能有 ~

`COPY . ~/` 或者 `COPY . ~`，构建不会报错，但是 `~/` 下没有文件。

`COPY . /root/` 或者 `COPY . /root` 才对。

`RUN mkdir -p ~/abc` 却是能创建成功 `~/abc` 的。
