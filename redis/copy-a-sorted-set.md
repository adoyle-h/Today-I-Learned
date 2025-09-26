---
title: 拷贝一个 Sorted Set 到新的 key
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


使用 zunionstore 命令

```
zadd foo 1 a
zadd foo 2 b
zunionstore bar 1 foo
zrange bar 0 -1
```
