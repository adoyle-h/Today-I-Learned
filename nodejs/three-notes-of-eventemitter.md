---
title: EventEmitter 需要注意的三个地方
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

## eventEmitter.emit 是同步回调的！

例子：

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', () => {
    console.log('an event occurred!');
});
emitter.emit('event');
console.log('hello');
```

输出：

```
an event occurred!
hello
```

> emitter.emit(eventName[, arg1][, arg2][, ...])#
>
> Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
>
> Returns true if the event had listeners, false otherwise.

详见 https://nodejs.org/api/events.html#events_asynchronous_vs_synchronous

## emit('error') 是一个特殊事件

详见 https://nodejs.org/api/events.html#events_error_events

当没有设置 error 的事件监听，`emit('error')` 会抛出 (throw) 新的错误。

## 当没有设置 'error' 事件监听时，`throw new Error()` 和 `throw 'a string'` 有细微的差别

```js
var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.emit('error', 'a string');
```

输出

```
events.js:159
      throw err;
      ^

Error: Uncaught, unspecified "error" event. (a string)
    at EventEmitter.emit (events.js:157:17)
    at Object.<anonymous> (<my-path>:3:9)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:146:18)
    at node.js:404:3
```

```js
var EventEmitter = require('events');
var emitter = new EventEmitter();
emitter.emit('error', new Error('Ouch!!'));
```

输出

```
events.js:154
      throw er; // Unhandled 'error' event
      ^

Error: Ouch!!
    at Object.<anonymous> (<my-path>:3:23)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:146:18)
    at node.js:404:3
```

因为 node 源码就是这么[实现](https://github.com/nodejs/node/blob/master/lib/events.js#L154)的。

```js
if (doError) {
er = arguments[1];
if (domain) {
  if (!er)
    er = new Error('Uncaught, unspecified "error" event');
  er.domainEmitter = this;
  er.domain = domain;
  er.domainThrown = false;
  domain.emit('error', er);
} else if (er instanceof Error) {
  throw er; // Unhandled 'error' event
} else {
  // At least give some kind of context to the user
  var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
  err.context = er;
  throw err;
}
return false;
}
```

这会导致开发者难以发现 `emit('error')` 没有对应监听器的问题。
