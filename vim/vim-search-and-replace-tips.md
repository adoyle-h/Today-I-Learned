---
title: VIM 搜索和替换技巧
created: 2019-09-24T21:37:50+0800
updated: 2019-09-24T21:37:50+0800
---


## （不）区分大小写

不区分大小写：`/\cword` 或者 `/word\c`

区分大小写：`/\Cword` 或者 `/word\C`

## 正则匹配

`/.*word` `.*` 匹配 n 个字符

## 替换确认

`c` 表示需要确认，例如全局查找 "foo" 替换为 "bar" 并且需要确认：

`:%s/foo/bar/gc`

回车后 Vim 会将光标移动到每一次 "foo" 出现的位置，并提示

`replace with bar (y/n/a/q/l/^E/^Y)?`

按下 `y` 表示替换，`n` 表示不替换，`a` 表示替换所有，`q` 表示退出查找模式，`l` 表示替换当前位置并退出。`^E` 与 `^Y` 是光标移动快捷键

https://harttle.land/2016/08/08/vim-search-in-file.html#header-6

## :g 和 :v 和 :p 命令

`:[range]g[lobal]/{pattern}/[cmd]` 正则匹配到的行执行命令。

`:[range]v[global]/{pattern}/[cmd]` 反向匹配，跟 `:g!` 一样。

`:[range]p[rint] {count} [flags]` 输出行到 Ex 栏。

使用方法

- 删除空白行 `:g/^$/d`
- 删除以#号开头的行 `:g/^#/d`
- 查询输出当前文件内所有匹配正则的行 `:g/regex/`

## 搜索时使用正则匹配单词边界。

比如 `/the\b` 会匹配到 `the`，也会匹配到 `then`。
应该使用 `/the\>` 来匹配。因为 `\b` 在 vim 的正则里是无效的，使用 `\<` 和 `\>` 代替。

默认的 `*` 和 `#` 是匹配边界的，`g*` 和 `g#` 不匹配边界。

[参考](http://stackoverflow.com/questions/8404349/in-vim-how-do-you-search-for-a-word-boundary-character-like-the-b-in-regexp)

## 搜索不匹配的行

`:v/pattern/` 搜索不匹配 pattern 的行。
`:v/pattern/d` 删除不匹配 pattern 的行。
详见帮助 `:h :v`。

## 批量删除匹配的行临近的一段

`:g/regex/-3,+1d` 删除包括匹配行之前的 3 行，且包括匹配行之后的 1 行。

详见 https://stackoverflow.com/a/17283363/4622308

## %s 替换时增加换行符

比如把所有 `,` 替换成换行符：`:%s/,/\r/g`

## 正则 Capture Groups 替换

1. 括号要转义 `\(\)`，不能用 `()`。
2. 替换的时候用 `\1`, `\2` 表示括号内匹配的字符串。

例如 `:s/\(\w\)-\(\w\)/\2-\1/g`，会把文本 `abc-123` 替换成 `123-abc`。
