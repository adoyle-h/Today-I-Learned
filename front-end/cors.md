---
title: CORS
created: 2017-03-23T22:09:12+0800
updated: 2017-03-23T22:09:12+0800
---


首先，看[标准](https://www.w3.org/TR/cors)！

好文章：

- [MDN - HTTP访问控制(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [重定向 CORS 跨域请求](https://web.archive.org/web/20171023011532/http://harttle.com/2016/12/30/cors-redirect.html)
- [CORS 跨域中的 preflight 请求](https://web.archive.org/web/20171116234855/http://harttle.com/2016/12/30/cors-preflight.html)
- [CORS 跨域发送 Cookie](https://web.archive.org/web/20180326140902/http://harttle.land/2016/12/28/cors-with-cookie.html)
- [Web 开发中跨域的几种解决方案](https://web.archive.org/web/20171226142607/http://harttle.land/2015/10/10/cross-origin.html)

## 服务端如何处理不匹配的 Origin

- https://github.com/koajs/cors/blob/0f3f948b9b8f00163a47de1b82e413bfef9b4a96/index.js#L89
- https://github.com/rs/cors/blob/0c96d3850073b93c94338ed8ade7de3c8fafb1cf/cors.go#L316

看了这两个库的实现，都是只设置了 Access-Control-Allow-Origin 以及其他响应头，而且会继续执行业务逻辑。

但是当客户端请求的 Origin 和服务端 allow-origin 不匹配时，有必要继续执行到业务逻辑吗？
不仅是 GET 请求，POST 请求也可能是简单请求，不会对服务端造成影响吗？

根据 [W3C 标准里的介绍](https://www.w3.org/TR/cors/#introduction)，

> This extension enables server-side applications to enforce limitations (e.g. returning nothing) on the cross-origin requests that they are willing to service.

应该是由服务端开发者自己决定如何处理的。
