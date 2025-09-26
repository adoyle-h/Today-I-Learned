---
title: Terminfo
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


[ncurses](https://invisible-island.net/ncurses/ncurses.html#download_database) 提供 terminfo 数据库，以及命令行工具 `infocmp`, `captoinfo`, `clear`, `infocmp`, `infotocap`, `ncursesw6-config`, `reset`, `tabs`, `tic`, `toe`, `tput`, `tset`。

https://man7.org/linux/man-pages/man5/terminfo.5.html

- 显示当前终端的 Terminfo 数据：`infocmp`。
- `echo $TERM` 显示终端类型。
- 显示当前终端支持的 Terminfo 数据：`infocmp <name>`。
  - 如果显示 `infocmp: couldn't open terminfo file (null).`，则表示没有安装这个 Terminfo。
- 更新 Terminfo 数据库：`tic -x ~/.terminfo/t/tmux-256color`

## Terminfo 搜索路径

根据 `man terminfo` 文档。
若有设置环境变量 `TERMINFO`，则在这个路径下寻找。若没有，则在 `$HOME/.terminfo/` 目录下找。若找不到，
则找是否存在环境变量 `TERMINFO_DIRS`，`TERMINFO_DIRS` 的内容是由冒号分隔的路径，会依次查询。
若 `TERMINFO_DIRS` 是空的，则在 `/usr/share/terminfo/` 目录下找。

## MacOS 里没有 tmux-256color

MacOS 系统自带了 ncurses 5，虽然有 terminfo 数据，但是比较旧，不包含 tmux-256color。

[有篇文章](https://gpanders.com/blog/the-definitive-guide-to-using-tmux-256color-on-macos/)讲的是如何在 MacOS 里导入 tmux-256color。但是其实用不着这么麻烦。下面是我的解决方案：

`which infocmp` 可以看到指向的是 `/usr/bin/infocmp`，而 `infocmp -V` 的结果是 `ncurses 5.7.20081102`。

用 `brew install ncurses` 安装 ncurses 6。(arm 架构) brew 安装的 ncurses 目录是 `/opt/homebrew/opt/ncurses`。
然后只要 `PATH=/opt/homebrew/opt/ncurses/bin:$PATH` 即可。这样调用 ncurses 的命令时，用的都是 6 而不是系统自带的 5 版本。

brew 安装的 ncurses 的 terminfo 数据库目录是 `/opt/homebrew/opt/ncurses/share/terminfo/` 里。
系统自带的 terminfo 数据库是 `/usr/share/terminfo`。

至于为什么 brew 包不更新系统自带的 ncurses，请看这个 [issue](https://github.com/Homebrew/homebrew-core/issues/39477)。
