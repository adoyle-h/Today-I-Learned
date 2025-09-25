---
title: 不需要 root 权限执行 ping
---


三种解决方案：setuid（不推荐）、capabilities、ping_group_range

## ping_group_range

`ping_group_range` 的取值范围是 linux 用户组 ID 的范围。

`sysctl net.ipv4.ping_group_range` 查看值默认应该是 `1 0`，代表禁用。

`sudo sysctl -w net.ipv4.ping_group_range='1000 1000'` 比如这么设置就是只允许 Group ID 为 1000 的执行 ping。

## capabilities

`which ping` 查看 ping 的路径，可能是 `/usr/bin/ping` 或者 `/bin/ping`。

`sudo setcap cap_net_raw+ep /usr/bin/ping` 设置 ping 有 `cap_net_raw` 权限。

`getcap /usr/bin/ping` 查看权限

## setuid

使用 `setuid` 存在着安全隐患，它直接把 root 用户的全部权限给了使用者，但我们运行 ping 其实只需要 `cap_net_raw` 权限。
