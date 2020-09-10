## 协程 (Coroutine)

- [Wikipedia - 协程](https://www.wikiwand.com/zh-hans/%E5%8D%8F%E7%A8%8B)
- [Golang和Erlang的并发调度浅析](https://studygolang.com/articles/18968)


### 协程与纤程 (Fiber) 的区别

根据高德纳的说法, 马尔文·康威于1958年发明了术语“coroutine”并用于构建汇编程序，关于协程最初的出版解说在1963年发表。[^1]

协程与纤程大致一样，主要区别在于跟调度器的关系。参考 C++ 的 Boost 库，有 Coroutine 和 Fiber 两种实现。
再参考这篇 2014 年写的 [Programming Language C++, SG1 N4024](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4024.pdf)。

> Of course it would be possible to implement coroutines on top of fibers instead. But the concepts map more neatly to
> implementing fibers in terms of coroutines. The corresponding operations are:
> • a coroutine yields;
> • a fiber blocks.
> When a coroutine yields, it passes control directly to its caller (or, in the case of symmetric coroutines, a designated
> other coroutine).
> When a fiber blocks, it implicitly passes control to the fiber scheduler. Coroutines have no scheduler because they
> need no scheduler.


随着时间，技术的概念可能产生了变化。协程与纤程的区别可能不需要详细区分，还得看主流的实现是怎样的。

- https://stackoverflow.com/a/44563119/4622308
- https://www.zhihu.com/question/23955356/answer/732629313


[^1]: https://www.wikiwand.com/zh-cn/%E5%8D%8F%E7%A8%8B
