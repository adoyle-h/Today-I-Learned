---
title: sudo :write
created: 2021-12-31T18:24:44+0800
updated: 2021-12-31T18:24:44+0800
---


vim 有个小技巧 `:w !sudo -S tee % >/dev/null` 用来以 sudo 权限写文件。

然而这个小技巧无法在 neovim 使用，具体见这个 [issue](https://github.com/neovim/neovim/issues/12103)。
可以装 [suda.vim](https://github.com/lambdalisue/suda.vim/) 来弥补这个问题。
