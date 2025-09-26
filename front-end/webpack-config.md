---
title: webpack 配置
created: 2018-07-30T22:31:25+0800
updated: 2018-07-30T22:31:25+0800
---


## require 使用变量的问题

``require(`${path_to_file}`);`` 和 `require(path_to_file);` 居然不一样，前者没问题，后者会报错：`Uncaught Error: Cannot find module "."`

https://github.com/webpack/webpack/issues/4921

不知道为什么。
