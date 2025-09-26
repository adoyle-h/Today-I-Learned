---
title: /usr/bin/env
created: 2016-10-11T21:38:06+0800
updated: 2016-10-11T21:38:06+0800
---


通常写语言脚本时，第一行会这么写：`#!/usr/bin/env node`

`/usr/bin/env` 的意义是指示在系统的 `PATH` 目录中查找对应的可执行程序，在这里是 `node`。

- 优点
    - 可执行程序不必在 `/usr/bin/` 下
- 缺点
    - 脚本不可移植
