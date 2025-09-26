---
title: cloudflare 缓存
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


cloudflare 默认会缓存 JS、CSS 等请求资源。（根据请求响应头的 Cache-Control 头判断是否缓存）
当 URL 不变时，cloudflare 会直接返回缓存内容，不请求源服务器。

这在 cloudflare 缓存-配置中可以设置“缓存级别”和“缓存 TTL”。 **默认 TTL 是 4 小时**。

无法查询已缓存列表。

## 缓存文件类型

**cloudflare 默认不缓存 HTML 和 JSON 资源。但会缓存网站的 JS、CSS、SVG、JPG、robots.txt 等文件。**
具体缓存哪些类型，请看[这个链接](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions)。

**cloudflare 根据文件后缀来判断是否缓存，并不根据 MIME type 判断。**

## 缓存大小

免费用户有 512MB 的缓存空间。

## 清除缓存

点 cloudflare 缓存-配置-清除缓存。等待至少 30 秒后刷新。
免费用户只能用 URL 方式清除缓存，且不支持通配符，这是很糟糕的体验。
企业用户可以用 URL 前缀的方式清除缓存。

临时跳过缓存的方法：URL 里加上新的 querystring 可以获得最新的内容。
