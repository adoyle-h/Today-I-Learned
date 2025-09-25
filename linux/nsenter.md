---
title: nsenter
---


`/var/run/netns` 没有容器创建的网络命名空间（以下简称 netns）。这是因为 `docker`（或者说 `containerd`）在创建 netns 后就把它从 `/var/run/netns` 删掉了。

<!-- {% raw %} -->
`docker inspect --format '{{.State.Pid}}' <container_name_or_Id>` 查询容器的 pid。
<!-- {% endraw %} -->

利用 `nsenter -t <contanier_pid> -n <command>` 命令可以方便的调试这个命名空间。

## nsenter 容器

https://github.com/justincormack/nsenter1
