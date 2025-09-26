---
title: 文件描述符，open file table 与 inode
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


推荐阅读以下内容：

1. [Linux 文件系统的实现](https://segmentfault.com/a/1190000000419225)
2. [Linux 中的文件描述符与打开文件之间的关系](http://blog.csdn.net/cywosp/article/details/38965239)
3. [文件描述符 file descriptor 与 inode 的相关知识](http://blog.csdn.net/jnu_simba/article/details/8806654)
4. [文件系统磁盘布局与 I/O 映射](http://www.sysnote.org/?p=189)

Linux 为了提高目录项对象的处理效率，设计与实现了目录项高速缓存（dentry cache，简称 dcache）。所以上文有些文章省略了 dentry 部分，不影响理解。
