---
title: 在 vim 中运行终端，以及如何退出终端模式
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


`:h terminal-emulator` 或者 `:h te` 获取相关信息。

按 `<C-\><C-n>` 退出 terminal mode。

推荐设定快捷键：

- `:tnoremap <Esc> <C-\><C-n>`
- `:tnoremap kj <C-\><C-n>`

## node repl 与 vim 交互

可以使用 [kassio/neoterm][] 将 vim 里的代码直接发到 node repl 中去。

[kassio/neoterm]: https://github.com/kassio/neoterm
