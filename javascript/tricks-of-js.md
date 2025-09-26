---
title: JS 编程技巧
created: 2017-04-13T23:38:55+0800
updated: 2017-04-13T23:38:55+0800
---


## 判断两个类是否是继承关系

> To check if B is a subclass of A (excluding the case where B === A):
>
> B.prototype instanceof A

> To check if B is a subclass of A (including the case where B === A):
>
> new B() instanceof A
> B.prototype instanceof A || B === A

源自 https://stackoverflow.com/a/18939541/4622308

## 异步函数不应该通过 throw error 来传递错误

因为 throw error 是同步的过程。如果容许这种使用方式，调用者必须监听两种错误可能抛出的方式：使用 `try/catch` 和 `.catch((err) => {})`。

try catch 对于调用者是很不方便的。尤其当要调用很多异步函数时，同时需要根据情况对其中某些函数做容错处理。
`try/catch` 的写法让代码变得丑陋。

所以异步函数应该始终通过 `promise.reject()` 来**传递错误**。

```js
function asyncFunc() {
    return Promise.resolve()
        .then(() => {
            // your logic codes
        });
}

asyncFunc()
    .catch((err) => {
        console.error('Caught an error!', err);
    });
```
