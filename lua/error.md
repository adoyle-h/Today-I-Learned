---
title: lua 错误处理
created: 2022-12-02T22:55:16+0800
updated: 2022-12-02T22:55:16+0800
---


- 使用 `error('message')` 抛出错误。
- 如果想打印错误堆栈，使用 `local ok, err = xpcall(func, debug.traceback, arg1, arg2...)`。
- 如果不想打印错误堆栈，仅用到 message，使用 `local ok, err = pcall(func, arg1, arg2...)`。

```
if not ok then print(err) end
```
