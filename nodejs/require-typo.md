---
title: require 路径名大小写问题
---


以 `moment` 这个库为例。

当我在 Mac 下执行 node 代码: `require('Moment')`，`require('MomenT')`，`require('MomENT')` 都是可以读到 `moment` 的。

然而在 Linux 下同样执行 `require('Moment')` 就会报错 `Cannot find module 'Moment'`。

## 原因

震惊吧！mac 的文件系统居然是大小写不敏感的！

- http://jiangrongyong.github.io/blog/2013/09/02/osx-file-system-case-insensitive/
- https://superuser.com/questions/380330/mac-convert-from-case-sensitive-to-case-insensitive-file-system

又因为 node 的 `require` 函数是依赖文件系统的实现，所以就导致在 Mac 下 `require('Moment')` 能匹配到 `moment`，但 Linux 文件系统是大小写敏感的，所以就匹配不到。

参考: http://stackoverflow.com/q/23289065

## 所以

npm 包名必须为小写。
