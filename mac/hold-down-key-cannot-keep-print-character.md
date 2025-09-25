---
title: Mac 下按住键盘不能输出重复的字符
---


在 mac 上按住一个字母的键，比如 a，有时候会打印一串 aaaaaa，有时候会卡住，弹出一个弹框选择各种音标 a。

导致 vim 的 hjkl 不能连续移动。

答案：

修改默认系统设置，执行 `defaults write -g ApplePressAndHoldEnabled -bool false`

详见:

- https://infinitediaries.net/os-x-choose-between-the-character-accents-popup-and-key-repeat-when-holding-down-a-key/
- https://gist.github.com/lsd/1e1826907ab7e49c536a
