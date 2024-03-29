# Duplicati

使用了一下 [Duplicati](https://github.com/duplicati/duplicati/) 这个开源系统备份软件。做个简单小结。

## 优点

1. 可以设置过滤条件，排除不需要备份的文件。而且支持正则匹配。
2. 跨平台。开源。
3. 支持定时备份。
4. 备份保存位置支持多种方式：本地磁盘，FTP，SFTP，WebDav，Dropbox，Mega，Rclone 等等。

## 缺点

0. 速度慢。如果 CPU 差一点，即使不压缩，备份速度也很慢，我这 windows 居然只有 8MB/s 的速度。Duplicati 论坛里有很多帖子，说是可能跟 exfat 文件系统有关。我总结了一些优化小技巧，速度提升至 125MB/s。
  - 添加高级选项 `thread-priority` 设置为 `highest`。让它尽可能利用 CPU（但总是跑不满）。
  - 如果你的 USB 和硬盘速度够快，`远程卷大小` 尽可能大一点，但别太大。比如设置为 `500MB`。
  - 不压缩。
1. 它会把自己的数据文件也备份进去。需要在过滤条件里加上 Duplicati 自身的文件目录。
  - 添加 `C:\Users\adoyle\AppData\Local\Duplicati\`。虽然它的目录树里找不到 AppData 目录，但是实际是存在的。
2. 会提示没有权限访问某些系统文件。
  - 备份的时候不提示，备份完了才报一堆 Warning 说不能访问空文件。我以为这些文件是空的，其实不是。查看 console 输出日志才发现是因为没权限。
  - 使用系统管理员权限运行也一样没权限。暂时不知道怎么搞定。

## 注意点

1. 过滤条件如果没有写绝对路径，那么匹配的是文件名，不是文件路径。
2. 过滤条件用 `\` 做目录分隔符。

## 替代方案

如果不用压缩和加密功能，只需要把目录文件复制到另一个硬盘。可以使用 [FreeFileSync](https://freefilesync.org/)，功能还是很强的。它的免费版本默认是单线程的，捐个款能获得多线程版本。

如果需要压缩功能。可以用 [DiskGenius](https://www.diskgenius.cn/) 来全量备份系统。它支持全盘备份，或者只拷贝盘里有内容的数据，或者只拷贝文件。它的缺点是不支持文件过滤以及加密。
