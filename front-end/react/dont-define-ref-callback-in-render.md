---
title: 不要在 render 里直接定义 ref callback
---

[示例代码](https://jsfiddle.net/ADoyle/3Lve6zw8/)

你会发现，子组件挂载后会正常调用一次 ref callback。
而之后的每次 render 都会触发两次 ref callback，第一次 ref 的实例为 null，第二次才有对象。

然而当把 ref callback 放到外面定义，情况会不同。见[第二个例子](https://jsfiddle.net/ADoyle/hmxtey2b)。
这里只在子组件挂载后会正常调用一次 ref callback，之后的 render 不会触发 ref callback。

在官方文档中的[这个章节的最后一段][0]以及[这个回答][1]，详细描述了原因。
所以说这是个 Feature，不是 Bug...

**所以一般情况下，不要在 render 里定义 ref callback !!!**

[0]: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
[1]: https://github.com/facebook/react/issues/5131#issuecomment-147185829
