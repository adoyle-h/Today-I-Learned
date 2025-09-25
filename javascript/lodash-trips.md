---
title: lodash 陷阱
---


## 避免用 _.each _.map 等函数来遍历 object

当 object 有名为 `length` 的 key 时候会被当成 array 来遍历，于是就出问题了。
详见 [gist](https://gist.github.com/adoyle-h/2e13e4668c7df54c04c1a551d14d98b9)。

查阅 _.each 的文档，会发现有这个注解：

> Note: As with other "Collections" methods, objects with a "length" property are iterated like arrays. To avoid this behavior use _.forIn or _.forOwn for object iteration.

所以除了 forIn 和 forOwn 方法，lodash 的其他遍历方法都不能用来遍历 object。
