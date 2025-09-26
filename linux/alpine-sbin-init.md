---
title: alpine 的 /sbin/init
created: 2023-12-01T01:27:55+0800
updated: 2023-12-01T01:27:55+0800
---


在 alpine 中，/sbin/init 是指向 /bin/busybox 的软链接。

在写基于 alpine 的 dockerfile 时，不要使用 `ENTRYPOINT ["/sbin/init"]`，因为在启动容器时会报错无法读取 /dev/tty。
建议使用 tini。通过 `apk add tini` 安装。
