---
title: 连接 tty
---


使用 `screen /dev/tty` 链接。可惜的是 tmux 居然无法做到。

按 `CTRL+A CTRL+\` 退出当前 screen。

另外也可以使用 [tio](https://github.com/tio/tio)。

另外，可以使用 `tty` 命令查看当前 tty。


## tty 与 pty

- [Linux TTY/PTS 概述](https://archive.ph/aQ6g3)

## Stty


## 调整终端屏幕尺寸

`stty size` 可以查看当前尺寸。
如果终端屏幕尺寸过小，可以调用 `resize` 来调整到全屏。
如果不存在 `resize` 命令，需要安装 `xterm` 这个软件。
