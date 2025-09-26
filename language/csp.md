---
title: CSP 并发模型
created: 2020-09-10T23:28:55+0800
updated: 2020-09-10T23:28:55+0800
---


CSP (Communicating Sequential Processe) 中文名为通信顺序进程。

> 这也是 Tony Hoare 在 1978 年发表在 ACM 的一篇论文。论文里指出一门编程语言应该重视 input 和 output 的原语，尤其是并发编程的代码。
> 在那篇文章发表的时代，人们正在研究模块化编程的思想，该不该用 goto 语句在当时是最激烈的议题。彼时，面向对象编程的思想正在崛起，几乎没什么人关心并发编程。
> 在文章中，CSP 也是一门自定义的编程语言，作者定义了输入输出语句，用于 processes 间的通信（communicatiton）。processes 被认为是需要输入驱动，并且产生输出，供其他 processes 消费，processes 可以是进程、线程、甚至是代码块。输入命令是：!，用来向 processes 写入；输出是：?，用来从 processes 读出。这篇文章要讲的 channel 正是借鉴了这一设计。
> Hoare 还提出了一个 -> 命令，如果 -> 左边的语句返回 false，那它右边的语句就不会执行。
> 通过这些输入输出命令，Hoare 证明了如果一门编程语言中把 processes 间的通信看得第一等重要，那么并发编程的问题就会变得简单。[^1]

## 代表实现

- [Occam](https://www.wikiwand.com/zh-hans/Occam)
- [Limbo](https://www.wikiwand.com/zh-hans/Limbo_(%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80))
- Go: 只用到了 CSP 的很小一部分，即理论中的 Process/Channel（对应到语言中的 Goroutine/Channel）
- Clojure 的 core.async

## 参考资料

- [Wikipedia - 交谈循序程式](https://www.wikiwand.com/zh-hans/%E4%BA%A4%E8%AB%87%E5%BE%AA%E5%BA%8F%E7%A8%8B%E5%BC%8F)
- [JaguarJack - 深度解密 Go 语言之 channel](https://learnku.com/articles/32142) ([链接备份](https://web.archive.org/web/20230225204145/https://learnku.com/articles/32142))

[^1]: https://learnku.com/articles/32142
