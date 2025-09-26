---
title: 在 vim 中执行 shell 命令，同时将结果输出到 buffer
created: 2016-08-28T15:51:06+0800
updated: 2016-08-28T15:51:06+0800
---


- `!` 执行 shell 命令
- `:r!` 读取 shell 命令结果到当前 buffer 中
- `:tabnew | r!` 读取 shell 命令结果到新的 tab
- `:new | r! ` 新的 window
- `:vnew | r!` 新的垂直 window

## 将 vim EX command 的输出，输出到 buffer 中

可以使用 `:redir` 将输出重定向到寄存器或文件中去。比如：

```vim
" 1. 重定向到寄存器 w
:redir @w
" 2. 执行命令
" 3. 切换到其他 buffer，从寄存器 w 中粘贴结果
"wp
" 4. 中止重定向
:redir END
```
