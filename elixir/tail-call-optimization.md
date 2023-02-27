## 尾递归优化

[Elixir 对于尾递归的介绍](http://elixir-lang.org/getting-started/recursion.html)

超赞的文章: [Tail Call Optimization in Elixir & Erlang – not as efficient and important as you probably think](https://pragtob.wordpress.com/2016/06/16/tail-call-optimization-in-elixir-erlang-not-as-efficient-and-important-as-you-probably-think/) ([链接备份](https://web.archive.org/web/20230225193923/https://pragtob.wordpress.com/2016/06/16/tail-call-optimization-in-elixir-erlang-not-as-efficient-and-important-as-you-probably-think/))

> don’t assume – always proof.

[2 The Eight Myths of Erlang Performance - 2.3  Myth: Tail-Recursive Functions are Much Faster Than Recursive Functions](http://erlang.org/doc/efficiency_guide/myths.html#id60476)


> So, the choice is now mostly a matter of taste. If you really do need the utmost speed, you must measure. You can no longer be sure that the tail-recursive list function always is the fastest.

关于这篇文章的讨论: https://elixirforum.com/t/tail-call-optimization-in-elixir-erlang-not-as-efficient-and-important-as-you-probably-think/880 ([链接备份](https://web.archive.org/web/20211127115746/https://elixirforum.com/t/tail-call-optimization-in-elixir-erlang-not-as-efficient-and-important-as-you-probably-think/880))
