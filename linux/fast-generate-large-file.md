---
title: 快速创建大文件
created: 2017-07-25T22:42:05+0800
updated: 2017-07-25T22:42:05+0800
---


几种命令：`truncate`, `fallocate`, `dd`, `mkfile` (仅 MacOS)。

- `dd` 用法最复杂，且效率最低。推荐 `truncate` 或 `fallocate`。
- `dd` 和 `truncate` 创建的是稀疏文件 (Sparse File)。该文件不包含用户数据，不会分配存储数据的磁盘块。只被 ASCII 码的 NULL 字符占据。当数据被写入稀疏文件时，才逐渐地为其分配磁盘块。因此创建会很快，并且拷贝稀疏文件时也很快，因为只复制了元数据。
- `fallocate` 会创建普通文件。
- `mkfile` 的 `-n` 参数可以创建稀疏文件，默认创建普通文件。

## 例子：创建一个 20G 文件

- `dd if=/dev/zero of=20G.txt bs=1M count=0 seek=20000`
- `truncate -s 20G 20G.txt`
- `fallocate -l 20G 20G.txt`
- `mkfile 20g 20G.txt`
- `mkfile -n 20g 20G.txt`
