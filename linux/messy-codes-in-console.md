---
title: 命令行中的乱码
created: 2017-07-10T11:29:25+0800
updated: 2017-07-10T11:29:25+0800
---


## tree 命令，中文路径乱码

使用 `tree -N` 即可。

```
-N     Print non-printable characters as is instead of as escaped octal numbers.
```

# git status 中文路径乱码

`git config --global core.quotepath false`

```
core.quotePath
           Commands that output paths (e.g.  ls-files, diff), will quote "unusual" characters in the pathname by enclosing the
           pathname in double-quotes and escaping those characters with backslashes in the same way C escapes control characters
           (e.g.  \t for TAB, \n for LF, \\ for backslash) or bytes with values larger than 0x80 (e.g. octal \302\265 for
           "micro" in UTF-8). If this variable is set to false, bytes higher than 0x80 are not considered "unusual" any more.
           Double-quotes, backslash and control characters are always escaped regardless of the setting of this variable. A
           simple space character is not considered "unusual". Many commands can output pathnames completely verbatim using the
           -z option. The default value is true.
```
