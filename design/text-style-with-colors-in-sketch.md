---
title: Sketch 的文本样式与颜色
---


## Question

我想有一套固定的文本样式 (text style) ，在设计组件时选择对应的文本样式，方便一键同步文本样式。
但是设计某些特殊组件时需要将文本改成其他颜色，但修改颜色会导致文本样式被修改。无法统一。

## Answer

[这篇文章](https://blog.prototypr.io/sketch-overriding-the-color-of-text-layers-in-symbols-69d54577158b) 非常有用，虽然是 2017 年写的，但 Sketch 62 依然有效。

要点是，做一个 symbol，里面有三个图层：

1. 作为替换颜色的 symbol。
2. 文本。或者带有文本样式的文本。
3. 白色背景。

图层 1 修改外观属性，用「滤色」。
图层 2 没有特殊之处。
图层 3 必须是白色背景。

使用做好 symbol，在覆盖层替换掉图层 1 的颜色 symbol 即可。
