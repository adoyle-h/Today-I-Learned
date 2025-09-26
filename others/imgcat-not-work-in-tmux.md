---
title: 无法在 Tmux 显示图片
created: 2019-09-03T00:29:47+0800
updated: 2019-09-03T00:29:47+0800
---


这会导致在 Tmux 下，Iterm2 的 imgcat 脚本，以及 ranger 的图片预览功能都无法使用。

实际上小图片可以显示，但大图就会因为超过 Tmux 的 buffer 最大 1M 的限制，而直接打印成字符。

具体见 [Issue](https://github.com/tmux/tmux/issues/1502#issuecomment-429710887)，估计这坑填不上了。

不过 [catimg](https://github.com/posva/catimg) 倒是可以用，不过打印的图都会变成像素风格。
