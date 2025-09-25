---
title: Promise 的坑
---


## bluebird 的 any/some 会吞 rejected promise

例如 any:

```js
var Promise = require('bluebird');

Promise.any([Promise.resolve(1), Promise.reject(2)])
    .then(function() {
        console.log('result', arguments);
    })
    .catch(function() {
        console.log('error', arguments);
    });
```

只有数组中的 promise 全都 rejected，any 的 promise 才会 rejected，否则就是 fulfilled。

因此如果数组里的某些 promise 函数发生意外情况了，如果不单独 catch 的话，就没法获知错误信息了。
