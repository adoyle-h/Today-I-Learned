---
title: 给命令的每一行输出加前缀的方法
---


```sh
#! /bin/bash
exec > >(trap "" INT TERM; sed 's/^/foo: /')
exec 2> >(trap "" INT TERM; sed 's/^/foo: (stderr) /' >&2)
echo foo
echo bar >&2
date
```

输出结果

```sh
foo: foo
foo: (stderr) bar
foo: Fri Apr 27 20:04:34 IST 2018
```

出自 https://unix.stackexchange.com/a/440439/373303
