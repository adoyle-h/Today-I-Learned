---
title: MaxListenersExceededWarning
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


MaxListenersExceededWarning 是当 EventEmitter 实例监听的事件超过 MaxListeners 时，会在 process emit 的事件。
但是这个事件只会触发一次。比如执行下面这段代码试试。

```js
'use strict';

const EventEmitter = require('events');

const e = new EventEmitter();

e.setMaxListeners(1)

const f = () => {};
Array(100).fill().forEach(() => {
    e.on('error', f);
});

setTimeout(() => {
    Array(100).fill().forEach(() => {
        e.on('error', f);
    });
}, 10000)
```

只会出现一次 `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 2 error listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit`。

所以看日志时要从程序启动后开始判断是否存在 MaxListenersExceededWarning。
