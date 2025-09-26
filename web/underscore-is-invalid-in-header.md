---
title: 下划线在 HTTP Header 里是非法字符串
created: 2019-04-13T00:17:20+0800
updated: 2019-04-13T00:17:20+0800
---


因为历史约定导致 HTTP Request Header 的名字不允许包含下划线 `_` 字符，否则（大多数）服务端程序会判断这个 Header 不合法。
比如 Nginx 如果没有开启 `underscores_in_headers on;` 配置，在转发请求的过程中就会丢弃不合法的 Header。
