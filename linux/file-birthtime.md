---
title: 文件的创建日期
created: 2025-09-25T21:00:12+0800
updated: 2025-09-25T21:00:12+0800
---


用 `stat $filepath` 查看文件的 atime/ctime/mtime/btime。
其中 btime 是文件的创建日期，ctime 不是。

## ctime（change time / status change time）

- 含义：文件 inode 元数据最后一次改变的时间。
- 以下操作会导致 ctime 变化：
  - 内容被修改（因为 inode 记录了文件大小、修改时间等信息）
  - 权限改变（chmod）
  - 所有者改变（chown）
  - 链接数变化（ln/unlink）
- touch 只能改 atime/mtime，不能改 ctime。

## btime（birth time / creation time）

- 含义：文件第一次被创建时的时间戳。
- 特点：
  - 固定的，之后不会改变。
  - 并不是所有文件系统都会记录（Linux 上很多 FS 没有这个字段，ext4 新版本才有，overlayfs 没有）。
  - 一般只在支持的文件系统的工具链里能看到，比如 macOS APFS、ZFS、ext4（新）、btrfs。


## overlay 的文件与 btime

如果 overlay 的 lower/upper 层使用支持 btime 的文件系统（如ext4、btrfs、zfs等），那么 btime 信息可以被保留。如果 lower 层文件系统不支持 btime，overlay 也无法提供这个信息。
