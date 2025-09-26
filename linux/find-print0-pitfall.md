---
title: find -print0 的坑
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


```bash
find . -name x -print0
find . -print0 -name x
```

两个命令执行结果不一样。
如果 `-print0` 放前面，后面的条件都会被忽略。

估计是 find 命令的解析问题 (Feature)，某些参数条件是有顺序的。
