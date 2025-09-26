---
title: 使用 sketchtool 操作 sketch 文档：diff 以及其他功能
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


sketchtool 内置在 sketch 中，执行 `Sketch.app/Contents/Resources/sketchtool/install.sh` 来安装它。

参考[官方文档](https://developer.sketch.com/cli/)。

## diff

`git diff` 默认对 sketch 文档比较的是二进制，通过设置 `.gitattributes` 文件，可以比较源码。
输入 `*.sketch diff=sketchtool`。

也可以编辑 `~/.gitattributes` 进行全局设置。
