---
title: 什么是 Monad
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## Monad (n.)

- 用普通语言解释，Monad 是一种类型无关的符合特定行为的抽象结构。
- 用编程语言解释，Monad 是一个类型类（元类）。
- 用数学语言解释，Monad 是自函子范畴上的一个幺半群。

- 映射的抽象
- 类型的抽象

- 串联
- 注入

Monad 是一种 Functor。

## 预备知识

- 范畴论
- 函子
- 态射

## Monadic (adj.)

> “Monadic” 仅仅表示 “和 Monad 相关的”。一个 monadic 类型就是一个 Monad 类型类的实例；一个 monadic 值就是一个具有 monadic 类型的值。
>
> 当我们说某个东西 “是一个 monad” 的时候，我们其实表达的意思是“这个类型是 Monad 这个类型类的实例”；作为 Monad 的实例就有三要素：类型构造器，注入函数，串联函数。[^1]

[^1]: http://cnhaskell.com/chp/14.html#and-now-a-jargon-moment


## JS 的 Promise 实际上是一种 Monad

跟 Either Monad 有点像，要么是 Fulfilled 状态（Right 值），要么是 Rejected 状态（Left 值），只不过在这之前是 Pending 状态。

## factorial(5) 与 120

有些语言不使用 return 关键字来返回函数值：因为一个函数就是一个单独的表达式（expression），而不是一组陈述（statement），求值表达式所得的结果就是函数的返回值。

所以这就是函数式编程与命令式编程的区别。


## 暗箱，隐藏细节

>当看见一个参数化类型（parameterized type）时，这表示代码并不在乎实际的类型是什么。另外，我们还可以给出一个更强的陈述：没有办法知道参数化类型的实际类型是什么，也不能操作这种类型的值；不能创建这种类型的值，也不能对这种类型的值进行探查（inspect）。
>
>参数化类型唯一能做的事，就是作为一个完全抽象的 “黑箱” 而存在。[^2]

[^2]: http://cnhaskell.com/chp/2.html#some-common-basic-types

Just 是对任意类型的装箱。

Nothing 是对空的装箱。你不必每次自己去判断函数返回值是否为 null，这个判断是在暗箱里进行的（对开发者透明）。

你关注的是有值的情况。

除法函数，`a/b` 当分母 b 为 0 时，这个函数应该如何？

a convenient alternative to exceptions


## Maybe 类型

Maybe 是一种 Monad。

Haskell 对于 Maybe 的定义是 `data Maybe a = Nothing | Just a`。

但为何不能是 `data Maybe a = Nothing | a` 呢？
以数学角度来解释，Maybe 这个范畴的定义就不准确了，因为 a 可以为任何类型。而 Nothing|Just 是固定类型的。
以程序角度来解释，不用 `a` 而用 `Just a` 是为了配合 Functor 统一处理，要不然层次上就差了一层。


## 参考书籍

- http://cnhaskell.com/
- http://learnyouahaskell.com/
  - [中文翻译](https://learnyouahaskell.mno2.org/zh-cn) [源码](https://github.com/MnO2/learnyouahaskell-zh)
- https://gist.github.com/weidagang/348024dac954d80e724e
