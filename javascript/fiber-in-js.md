---
title: JS 的 fiber 技术
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


可以看看贺师俊和响马的评价，很有启发。

- [如何评价node-fibers? 贺师俊的回答](https://www.zhihu.com/question/59441623/answer/168675034) ([链接备份](https://archive.is/WikMU))
- [如何评价node-fibers? 响马的回答](https://www.zhihu.com/question/59441623/answer/175420027) ([链接备份](https://archive.md/NlAyE))

- [Why coroutines won’t work on the web](http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/): 这篇文章讲述了为什么 Coroutines 入不了 JS 标准。 ([链接备份](https://web.archive.org/web/20221215105323/http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/))

## 我的观点

### 修改调用链

> 比如一段代码，其中一个底层实现，现在是同步的，于是中间某层某个逻辑没有加锁，有一天这个底层实现改成 await 了，一路改上来就不说了，鬼才记得中间哪一层在猴年马月苦思冥想后决定不加锁了。

fiber 会让异步函数看起来像同步函数，不用修改调用链这点是优点。  
但是，很可能会导致调用者不小心把它当成真的同步函数，以为是同步的，实际是异步的。  
函数用同步方式调用，但执行期间，控制权会移交到其他函数。导致开发者流程控制的难度增加。

这样的问题是因为是先入为主的观念导致的。

因为写 js 的时候，我会依赖「因为是同步阻塞的，且只有一个业务线程」这种思路，在同一个函数里处理数据时，为了方便或者性能，会不用深拷贝和闭包。如果这时候我依赖的函数库（版本升级后）从同步函数变成了异步函数，会导致控制权移交，那我的业务函数的数据修改就不能保证顺序了。

异步 callback，yield generator ，async/await 和 Promise 都显示指明了异步，显示区分了同步和异步，所以“看起来”不会有问题。

如果保证不会使用共享状态数据，那是没有问题的。

所以这是环境遗留问题，不是两种 fiber 与其他异步方案的优劣问题。
如果开发者一开始就使用一门只用 fiber 的语言，那写起来也不会有疑问。

在当前的 JS 社区中引入 Fiber 概念，会导致现有的库和写法不兼容 Fiber 的写法，这里的「不兼容」是指对共享数据的处理。
