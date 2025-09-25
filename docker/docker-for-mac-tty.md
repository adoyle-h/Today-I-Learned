---
title: 进入 docker for mac 的虚拟机
---


## （推荐）使用 nsenter 容器进入

`docker run -it --rm --privileged --pid=host justincormack/nsenter1`

## 使用 debug-shell.sock

`nc -U ~/Library/Containers/com.docker.docker/Data/debug-shell.sock`

但终端一直会打印 `^[[40;5R` 字符。

## （已失效）使用 screen 来进入 tty

`screen ~/Library/Containers/com.docker.docker/Data/vms/0/tty`

按 `CTRL+A CTRL+\` 退出当前 screen。

具体见[连接 tty](../linux/connect-tty.md)

## 使用 [doenter](https://github.com/fntlnz/doenter)


## 登录用户

默认为 root，无密码

## 参考

- https://gist.github.com/BretFisher/5e1a0c7bcca4c735e716abf62afad389
