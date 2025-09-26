---
title: Input Method Editor (IME)
created: 2021-11-03T03:58:59+0800
updated: 2021-11-03T03:58:59+0800
---


- [W3C - Input Method Editor API](https://www.w3.org/TR/ime-api/)
- [W3C - UI Events - Input Method Editors](https://www.w3.org/TR/uievents/#keys-IME)

Input Method Editor (IME) 就是输入法编辑器程序，即你当前所使用的系统输入法。
IME 是系统组件。不同操作系统对 IME 有不同的要求，比如 Windows 的 [IME 文档](https://docs.microsoft.com/zh-cn/windows/apps/design/input/input-method-editors)，比如 X 窗口系统的[规范](https://www.x.org/releases/X11R7.7/doc/libX11/libX11/libX11.html#Input_Methods)。

这里的 IME API 是浏览器对输入法程序的请求封装。

`compositionstart`、`compositionupdate`、`compositionend` 事件

[这里](https://www.w3.org/TR/uievents/#keys-IME)下面的 Example 写得真好，一目了然。
