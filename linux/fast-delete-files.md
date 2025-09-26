---
title: 快速删除文件
created: 2022-02-06T23:12:29+0800
updated: 2022-02-06T23:12:29+0800
---


```sh
# 随便建一个空目录
mkdir /abc
# 删除目录 target
rsync -a --delete /abc target/
```
