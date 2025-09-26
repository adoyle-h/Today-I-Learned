---
title: 尾递归优化
created: 2017-04-19T21:57:20+0800
updated: 2017-04-19T21:57:20+0800
---


很棒的文章: [Tail call optimization (TCO) in Node v6](https://medium.com/@dai_shi/tail-call-optimization-tco-in-node-v6-e2492c9d5b7c)

注意[这个评论][1]指出 `return undefined` 的细节。


从 6.10.2 开始到目前的 8.0.0 为止，node 仍未完全支持 (harmony) 尾递归优化 (Tail Call Optimisation)。

参看[特性支持](http://node.green/#ES2015-optimisation-proper-tail-calls--tail-call-optimisation-)

`node --harmony_tailcalls --use_strict` 开启 TOC。

尾递归小结: http://exploringjs.com/es6/ch_tail-calls.html#_checking-whether-a-function-call-is-in-a-tail-position


## 其他

[尾递归在 Elixir/Erlang 里的实现](../elixir/tail-call-optimization.md)


[1]: https://medium.com/@rauschma/f-x-1-is-not-a-tail-call-here-1020f3b7a390
