---
title: btrfs
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## No space left on device

`df -h` 看硬盘占用率是不准确的，一定是显示不到 100%。但实际上可能已经磁盘满了。
必须用 `btrfs fi df <path>` 和 `btrfs fi usage <path>` 来看硬盘占用率。
