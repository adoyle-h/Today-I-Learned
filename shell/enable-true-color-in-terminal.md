---
title: 终端开启真彩色 (true color)
created: 2025-07-13T23:53:59+0800
updated: 2025-07-13T23:53:59+0800
---


iTerm 2 默认支持真彩色，但是 tmux 和 vim 默认不支持。

检测真彩色的脚本: https://github.com/gnachman/iTerm2/blob/master/tests/24-bit-color.sh

解决方案: https://lotabout.me/2018/true-color-for-tmux-and-vim/

## 运行在 tmux 的 nvim 开启真彩色

`set -g default-terminal screen-256color` 虽然让 tmux 支持了真彩色，但是运行在 tmux 的 nvim 还是不支持。
得用 `set -g default-terminal xterm-256color` 才行。
