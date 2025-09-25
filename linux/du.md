---
title: du
---


## du -x

因为很多时候会把其他文件系统 mount 进来，导致 du 统计根目录时会把其他文件系统的空间大小统计进来。
`du -x` 这个参数能不统计其他文件系统。

## du 太慢了

比如 `du -h -d 1 /` 会非常慢，卡住。

替代工具

- [agedu](https://www.chiark.greenend.org.uk/~sgtatham/agedu/)
- [duc](https://duc.zevv.nl/)
- [ncdu](https://dev.yorhel.nl/ncdu)
