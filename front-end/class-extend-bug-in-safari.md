---
title: Safari 浏览器的类继承 Bug
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


![safari_class_extend_bug_20191201_214626.png](https://cdn.adoyle.top/TIL/safari_class_extend_bug_20191201_214626.png)

左边是 Chrome，版本 78.0.3904.108（正式版本）（64 位）；右边是 Safari，版本 13.0.3 (15608.3.10.1.4)。
Chrome 里 `q` 对象有 `k` 函数，且 `toString` 函数被覆盖。但是 Safari `q` 里没有 `k` 函数，而且 `toString` 函数也是原始的。

`q instanceof Q4` 在 Safari 中是 `false`，在 Chrome 里是 `true`。

区别在于，Safari 的 `URLSearchParams` 根本就不可继承，原型链上直接跳过了 Q4，直接指向 URLSearchParams。

我试了 `URL` 也不行。搜索 `safari extend class` 也没搜到有用的信息。很奇怪。
