---
title: '<C-I> 在 nvim 里等同于 <Tab>'
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


问题不在于 nvim，而是在终端模拟器。在终端里按 `<C-I>` 也会跟 `<Tab>` 一样进行代码补全。

是否支持 CSI(Control Sequence Introducer) Sequences。

:h tui-csiu


比如 iTerm2 里要打开 `Report keys using CSI u` 这项设置，才能分离 `<C-I>` 和 `<Tab>`。

ANSI Escape Sequences
