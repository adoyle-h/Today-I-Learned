---
title: ref callback 何时触发？
---

> Note that when the referenced component is unmounted and whenever the ref changes, the old ref will be called with null as an argument.

- unmount
- ref callback 重新赋值

因为会导致 ref = null，所以 ref callback 建议这么定义：

```js
(r) => {
    this.a = r;
    this.b = _.get(r, 'b', null);    // 防止空指针引用错误
}
```
