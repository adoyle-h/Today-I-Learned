---
title: lsof 与 fuser
---


## lsof

lsof 是 list open files 的缩写，即它能够列出任何文件信息 (Unix/Linux 一切皆文件)。[这篇文章](http://www.danielmiessler.com/study/lsof/)介绍了很多 lsof 的用法。([链接备份](https://web.archive.org/web/20221206182002/https://danielmiessler.com/study/lsof/))

ls 能按条件查找，比如查看用户相关的、或端口相关的、或进程相关的所有文件信息

### Mac 的 lsof 缺陷

Mac 系统用 lsof 命令查任何文件，都会卡很久才出结果。

```bash
# 实测
> time lsof -n s.js

real    1m55.912s
user    0m0.215s
sys     1m50.129s
```

[Why is lsof on OS X so ridiculously slow?](https://apple.stackexchange.com/q/81140/488359)

实测，答案里的这堆参数都加了也没有用。

## fuser

fuser 能列出正在对某个文件或端口访问的所有进程。

如果你使用 Linux 系统，但找不到 fuser 这个命令，需要安装 [psmisc](https://gitlab.com/psmisc/psmisc) 工具包。

psmisc: A package of small utilities that use the proc file-system.
psmisc 提供以下命令，

- fuser   - Identifies processes using files or sockets
- killall - kills processes by name, e.g. killall -HUP named
- prtstat - prints statistics of a process
- pslog   - prints log path(s) of a process
- pstree  - shows the currently running processes as a tree
- peekfd  - shows the data travelling over a file descriptor

fuser 比 lsof 多出一个 `-k` 参数的功能，它是用来 kill 相关进程。


### Mac 的 fuser 缺陷

Mac 系统也有装 fuser，但是这个 fuser 不支持 `-k` 参数。

而且 Mac 的 fuser 实际会调用 lsof，所以还是会卡很久。

例子，

```bash
ps -ef | grep 33447
  501 33447 29390   0  7:25下午 ttys017    0:00.04 /usr/bin/perl -w /usr/bin/fuser README.md
  501 33448 33447   0  7:25下午 ttys017    2:02.26 /usr/sbin/lsof -F pf -- README.md
```

## 找回被删除的文件

你甚至可以使用 lsof 来找到被删除的文件！（前提是有某个进程正在使用这个文件）

> 当 UNIX 计算机受到入侵时，常见的情况是日志文件被删除，以掩盖攻击者的踪迹。管理错误也可能导致意外删除重要的文件，比如在清理旧日志时，意外地删除了数据库的活动事务日志。有时可以恢复这些文件，并且 lsof 可以为您提供帮助。
> 当进程打开了某个文件时，只要该进程保持打开该文件，即使将其删除，它依然存在于磁盘中。这意味着，进程并不知道文件已经被删除，它仍然可以向打开该文件时提供给它的文件描述符进行读取和写入。除了该进程之外，这个文件是不可见的，因为已经删除了其相应的目录条目。
> Linux 的优点在于，它保存了文件的名称，甚至可以告诉我们它已经被删除。在遭到破坏的系统中查找相关内容时，这是非常有用的内容，因为攻击者通常会删除日志以隐藏他们的踪迹。

## umount 与 target is busy

有时候 umount 设备时会报错 `target is busy` 或者 `device is busy`。

可以用 `sudo lsof $path` 或者 `sudo fuser -mv $path` 查看什么进程在使用这个文件。
