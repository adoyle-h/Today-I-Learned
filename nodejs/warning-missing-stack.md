---
title: Warning 缺少堆栈信息
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


情景是运行时发现日志只有下面这样的消息，没有任何堆栈。

`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 error listeners added to [File]. Use emitter.setMaxListeners() to increase limit`

这是因为在 node v6.0.0 之前 warning 是会打印堆栈的，6.0.0 之后，改成了需要开发者自己监听 process 的 warning 事件。

两种解决方案：

1. node 启动参数里加 `--trace-warnings`。
2. 在程序里监听 process 的 warning 事件。

```js
process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});
```

具体参考 [NodeJS 官方文档](https://nodejs.org/api/process.html#process_event_warning)
