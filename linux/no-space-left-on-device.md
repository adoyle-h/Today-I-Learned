---
title: 硬盘空间占满问题
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


主要以下几种情况

1. 分区的空间容量满了
2. 分区的 inode 容量满了
3. 僵尸进程引用已删除的文件

## 分区的空间容量满了

- 检测方法：`df` 检查空间占用量。
- 解决方法：自己删文件，或者换更大空间的硬盘。

## 分区的 inode 容量满了

- 检测方法：`df -i` 检查 inode 占用量。
- 解决方法：[重新设置 inode 配置](./ext-fs.md#调整-inode)。

## 僵尸进程引用已删除的文件

- 检测方法：
  - `lsof | grep delete` 查看已删除又被引用的文件
  - `ps -ef | grep -E 'Z|defunct'` 查看僵尸进程
- 解决方法：清理僵尸进程（kill 僵尸进程的父进程或者重启系统）

## 参考

- https://help.aliyun.com/document_detail/42531.html ([链接备份](https://web.archive.org/web/20220529003952/https://help.aliyun.com/document_detail/42531.html))
