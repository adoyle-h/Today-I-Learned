## 使用 Promise 的技巧

### 好文章

- [taoofcode - Promise Anti-patterns](http://taoofcode.net/promise-anti-patterns/) ([链接备份](https://web.archive.org/web/20221208001826/https://taoofcode.net/promise-anti-patterns/))
- [exploringjs - 25. Promises for asynchronous programming](http://exploringjs.com/es6/ch_promises.html)

### 如何在链式处理中访问之前的 promise 返回的值？

有两种方法：

1. [break the chain](http://stackoverflow.com/a/28250704/4622308)
2. [bluebird .bind function](http://bluebirdjs.com/docs/api/promise.bind.html)

### 监听未 catch 的 promise，以防 silent fail

参加[这篇文章](https://adoyle.me/blog/silent-fail-in-promise.html)

