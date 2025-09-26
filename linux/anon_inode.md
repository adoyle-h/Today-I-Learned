---
title: anon_inode
created: 2022-01-05T21:11:43+0800
updated: 2022-01-05T21:11:43+0800
---


根据 [`man proc` 文档](https://man7.org/linux/man-pages/man5/proc.5.html)

> For file descriptors that have no corresponding inode (e.g., file descriptors produced by bpf(2), epoll_create(2), eventfd(2),
> inotify_init(2),  perf_event_open(2),  signalfd(2),  timerfd_create(2), and userfaultfd(2)), the entry will be a symbolic link
> with contents of the form
>
>     anon_inode:<file-type>
>
> In many cases (but not all), the file-type is surrounded by square brackets.
>
> For example, an epoll file descriptor will have a symbolic link whose content is the string anon_inode:[eventpoll].

anon_inode 是一类匿名的文件描述符。

> 匿名 fd 背后的是一个叫做 anon_inodefs 的内核文件系统（ 位于 fs/anon_inodes.c），这个文件系统极其简单，整个文件系统只有一个 inode ，这个 inode 是文件系统初始化的时候创建好的。之后，所有需要一个匿名 inode 的句柄都直接跟这个 inode 关联即可。

详见

- [Linux fd 系列｜ “匿名句柄” 是一切皆文件背后功臣](https://archive.ph/7KWEl)。
- https://github.com/torvalds/linux/blob/master/fs/anon_inodes.c
- https://github.com/torvalds/linux/blob/master/include/linux/anon_inodes.h
