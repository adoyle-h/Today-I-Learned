---
title: 流 (stream)
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

## 'finish' 与 'end' 事件的区别

node 官方文档：

> The 'finish' and 'end' events are from the stream.Writable and stream.Readable classes, respectively. The 'finish' event is emitted after stream.end() is called and all chunks have been processed by stream._transform(). The 'end' event is emitted after all data has been output, which occurs after the callback in transform._flush() has been called.

> https://nodejs.org/api/stream.html#stream_events_finish_and_end

stackoverflow 解答：

`end` and `finish` are the same event BUT on different types of Streams.

- `stream.Readable` fires ONLY `end` and NEVER `finish`
- `stream.Writable` fires ONLY `finish` and NEVER `end`

Source: https://nodejs.org/dist/latest-v5.x/docs/api/stream.html

**Why the different naming of the same event?**

The only reason I could think of is because of duplex streams (`stream.Duplex`), which implement both `stream.Readable` and `stream.Writable` interfaces (https://nodejs.org/dist/latest-v5.x/docs/api/stream.html#stream_class_stream_duplex) are readable and writable stream at the same time. To differentiate between end of reading and end of writing on the stream you must have a different event fired. SO, for Duplex streams `end` is end of reading and `finish` is end of writing.

> https://stackoverflow.com/a/34310963
