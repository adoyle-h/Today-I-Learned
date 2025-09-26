---
title: flyway 用法
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


所有 flyway cli 命令的选项都是单 `-` 开头。且遵从格式： `flyway [options] command`。


## 输出更多信息

> Adding -X to the argument list to also print debug output.

`flyway -X migrate`

## `flyway migrate` 只升级到指定版本，后面的版本不执行

`flyway -target <版本号> migrate`

`flyway -target <版本号> info` 可以在 state 栏位看到 `>Target`。
