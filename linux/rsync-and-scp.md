---
title: rsync 与 scp
created: 2019-09-03T00:29:47+0800
updated: 2019-09-03T00:29:47+0800
---


## rsync 缺点

远端机器也得安装 rsync，否则执行 rsync 会报错找不到 rsync 命令。

## 区别

> rsync只对差异文件做更新，可以做增量或全量备份；而scp只能做全量备份。简单说就是rsync只传修改了的部分，如果改动较小就不需要全部重传，所以rsync备份速度较快；默认情况下，rsync 通过比较文件的最后修改时间（mtime）和文件的大小（size）来确认哪些文件需要被同步过去。

> rsync是分块校验+传输，scp是整个文件传输。rsync比scp有优势的地方在于单个大文件的一小部分存在改动时，只需传输改动部分，无需重新传输整个文件。如果传输一个新的文件，理论上rsync没有优势；

> rsync不是加密传输，而scp是加密传输，使用时可以按需选择。

https://www.cnblogs.com/kevingrace/p/8529792.html

## 等价写法

- `scp -l 1024` vs `rsync --bwlimit 1024`
