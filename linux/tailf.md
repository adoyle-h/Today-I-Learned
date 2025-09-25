---
title: tailf
---


相比 `tail -f`，更推荐用 [tailf](https://linux.die.net/man/1/tailf)。
因为当文件内容不增加时，tailf 不会去访问这个文件。并且不会更新文件的 `access time`。
而 `tail -f` 会周期性地更新文件的 `access time`。

tailf 更利于监控笔记本电脑上的日志文件。因为当日志记录不频繁时，tailf 命令避免导致硬盘保存转速，这样可以节省电池寿命。

## tail -f

`tail -f` 默认情况下是以文件描述符进行追踪的。当文件改名时，它依然会追踪改名后的文件。
如果你想追踪的是固定名字的文件内容。可以用 `tail -f --follow=name`，无论这个文件被移除或者新创建，都可以继续追踪。
详见 [tail 文档](https://linux.die.net/man/1/tail)。
