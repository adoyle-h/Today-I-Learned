---
title: lua 正则
created: 2024-05-09T20:37:01+0800
updated: 2024-05-09T20:37:01+0800
---


## 问题：无法匹配带有 - 的文本

例子

```lua
s='neo-tree filesystem'
s.find('^neo-tree') -- 返回 nil
```

这是因为 [6.4.1 – Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1) 记录着：

> a single character class followed by '-', which also matches sequences of zero or more characters in the class. Unlike '*', these repetition items will always match the shortest possible sequence;

所以 `-` 是特殊字符，如果要匹配文本 `-`，就需要转义，用 `%-` 去匹配文本 `-`。

```lua
s='neo-tree filesystem'
s.find('^neo%-tree') -- 返回 1 8
```
