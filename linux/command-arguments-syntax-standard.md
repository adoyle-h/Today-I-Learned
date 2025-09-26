---
title: 命令格式标准
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


Q: linux 命令解析有标准吗？对于这种格式的命令 `command -g12`，参数是解析成 `g=12`，还是 `g=true`, `1=true`, `2=true`？

-----

- Rust 的库 clap，`-g12` 被解释为 `g12=true`。
- nodejs 的库 minimist，`-g12` 被解析成 `g=12`。

查到 GNU 命令是遵循这个 [POSIX 规范](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html) ([链接备份](https://web.archive.org/web/20230211190452/https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html))的。
但是这个规范写得很不详细。

所以我的结论是命令解析和书写都没有业界统一规范，是根据各个命令自己的 USAGE 决定怎么调用和怎么解析的。

-----

现阶段做的比较好的规范

- http://docopt.org/
- https://gist.github.com/pksunkara/1485856
