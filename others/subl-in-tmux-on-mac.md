---
title: mac 里的 tmux 内无法用 sublime 打开文件
created: 2016-04-05T21:15:32+0800
updated: 2016-04-05T21:15:32+0800
---


解决方案：使用 [tmux-MacOSX-pasteboard](https://github.com/ChrisJohnsen/tmux-MacOSX-pasteboard)。

实际上 reattach-to-user-namespace 可以解决剪切板之外的问题，[Use a “Reattaching” Wrapper Program](https://github.com/ChrisJohnsen/tmux-MacOSX-pasteboard#use-a-reattaching-wrapper-program)。

参考 [stackoverflow 上的答案](http://stackoverflow.com/a/17334785/4622308)
