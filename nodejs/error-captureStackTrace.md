---
title: Error.captureStackTrace 的 stack 缺少 message 问题
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


（旧文，不一定符合现在的 nodejs。引用链接也失效了，找不回来）

> The first line of the trace, instead of being prefixed with ErrorType: message, will be the result of calling targetObject.toString().

根据[引用](https://nodejs.org/dsst/latest-v6.x/docs/ap i/errors.html#errors_error_capturestacktrace_targetobject_constructoropt)所述，stack 第一行的 message 应该是目标对象的 toString 结果。**然而实际并不是这样！**

在这个 [issue](https://github.com/nodejs/node/issues/5675#issuecomment-203966051) 中说明了，stack 第一行实际内容是根据目标对象的 name 和 message 属性来拼接的。

V8 引擎: 怪我咯?

