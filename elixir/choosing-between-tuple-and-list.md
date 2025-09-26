---
title: tuple 与 list 的选择
created: 2016-03-27T23:08:17+0800
updated: 2016-03-27T23:08:17+0800
---


tuple 和 list 在读取和修改有性能方面的差异。具体请阅读官方文档。

## 问题

很多函数都以 tuple 的形式返回结果，为何不以 list 的形式返回，如 `[:ok, "hello"]`？
官方文档上说 guide you to do the right thing，但这个例子没看出来有什么性能上的区别。

`[:ok, result] = [:ok, "hello"]` ， `{:ok, result} = {:ok, "hello"}` 我觉得都可以啊。

## 解答

参照 [stackoverflow 上的解答][1]，我觉得最主要是取决于：

- LIST: You will use this when you cannot know when you write your program how many term this list will contain
- Tuple : You will use a tuple when you know how many term it will contain when you write your program

函数返回值是否要考虑长度变化是关键。

因为 `{:ok, a} = {:ok, 1, 2}` 无法匹配，而 `[:ok | a] = [:ok, 1, 2]` 是可以的。（`[:ok, a] = [:ok, 1, 2]` 也是无法匹配的）

[1]: http://stackoverflow.com/questions/26228267/difference-between-a-list-and-a-tuple-in-erlang
