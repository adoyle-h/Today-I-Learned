---
title: 修正 Docker for mac 时区问题
created: 2016-11-13T00:00:01+0800
updated: 2016-11-13T00:00:01+0800
---


在容器中修正时间没有用，因为宿主机是 Alpine moby 虚拟机，而非你的 mac。

应该执行 `sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`

然而 moby 缺少 `/usr/share/zoneinfo/` 目录。
需要 `apk add tzdata` 来安装时区信息。（apk 是 alpine 的包管理器）。参考 https://wiki.alpinelinux.org/wiki/Setting_the_timezone
然而我遇到了 `Bad file descriptor` 的报错，所有 apk 操作都有这个错误。
解决办法是执行 `setup-apkcache`，重置 apk 的缓存。

```sh
setup-apkcache
apk update
apk add tzdata
```

## 找不到 `setup-apkcache` 命令？

执行 `apk add alpine-conf` 来安装 /sbin/setup-* 脚本。参考[这篇短文][0]

## 然而

因为 Docker for mac 是跑在虚拟机里，如果没有持久化数据，重启之后你所做的修改就都没了。然而我还不知道怎么保存数据。


[0]: https://github.com/adoyle-h/Today-I-Learned/tree/master/linux/setup-scripts-in-alpine.md
