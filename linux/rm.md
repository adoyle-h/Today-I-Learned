---
title: rm 命令
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## rm ./* 不会删除 . 开头的文件

```sh
mkdir -p tmp
touch ./tmp/.abc
touch ./tmp/hello
rm -f ./tmp/*
ls -a ./tmp
# .    ..   .abc
```
