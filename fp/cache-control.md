---
title: Cache-Control
---


Cache-Control 不止是在 Response Header 中设置，还能在 Request Header 里设置。

- [HTTP/1.1 的定义](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)
- [MDN - Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9.2

## In Request: no-cache 与 no-store 的区别

`Cache-Control: no-cache` 代表不使用强缓存，可使用协商缓存。它允许服务器先确认返回的响应是否发生了变化。

`Cache-Control: no-store` 代表强缓存、协商缓存都不使用。它直接禁止浏览器以及所有中间缓存存储任何版本的返回响应

参考: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn#cache-control

## In Request: no-cache 与 max-age=0 的区别

`Cache-Control: max-age=0` 代表应该去重新校验数据

`Cache-Control: no-cache`

参考: https://stackoverflow.com/a/1383359
