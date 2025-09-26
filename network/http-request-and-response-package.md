---
title: HTTP Request/Response 网络包
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


Q: 多个 http 请求可以复用同一个 tcp 连接，那么程序怎么知道它得到的 http response 包是对应它之前发出的哪个 http request 包？

A: http 1.1 虽然是复用同一个 tcp 连接，但是按顺序收发的，意味着会阻塞。所以 http 1.1 的报文结构没有 ID 之类的字段。所以在浏览器对于 http 1.1 会建立多个 tcp 连接，来保证并发 http 请求。
在 http 2 才有多路复用，利用 Stream ID 来标志的，真正复用同一个 tcp 连接并发 http 请求。https://www.rfc-editor.org/rfc/rfc7540#page-21
