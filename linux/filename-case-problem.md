---
title: 文件名大小写问题
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


不要大小写混用，最好全部小写。

例子 `git clone git://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git`

```
警告：以下路径发生碰撞（如：在不区分大小写的文件系统上的区分大小写的路径），
并且碰撞组中只有一个文件存在工作区中：
  'radeon/BONAIRE_ce.bin'
  'radeon/bonaire_ce.bin'
  'radeon/BONAIRE_mc.bin'
  'radeon/bonaire_mc.bin'
  'radeon/BONAIRE_me.bin'
  'radeon/bonaire_me.bin'
  'radeon/BONAIRE_mec.bin'
  'radeon/bonaire_mec.bin'
```
