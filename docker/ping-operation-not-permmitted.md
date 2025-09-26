---
title: 'ping: Operation not permitted'
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 问题描述

通常在 rootless 的容器里执行 ping 会报错，

```sh
$ ping 192.168.1.1
bash: /bin/ping: Operation not permitted
```

## 解决方案

如果只是在 `docker exec` 容器里进行网络调试，可以加上 `--privileged` 参数获取全部权限：`docker exec --privileged -it nextcloud bash`。

如果是想让原本的容器就具备 ping 的能力，那只有重新建容器。因为 `getcap /bin/ping` 可以看到结果 `/bin/ping cap_net_raw=ep`。
而 ping 需要的权限是 `cap_net_admin` 和 `cap_net_raw+ep`，于是需要重新建容器，加上 `--cap-add` 参数：`docker run --cap-add net_raw --cap-add net_admin`。
