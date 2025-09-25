---
title: HTTP 缓存机制
---


两个概念：协商缓存，强缓存。

要注意中间层的缓存，如 nginx，CDN 等等。

浏览器内的不同刷新行为，甚至不同浏览器的相同刷新行为，都会影响是否使用缓存。

Cache-Control 设为 private，只能被终端用户的浏览器缓存，不允许中间服务器对其缓存。
Cache-Control 不光可以设置在响应的 HEADER。还可以设置为请求的 HEADER。

使用 HTML Meta 标签设置缓存处理。

- [http协商缓存VS强缓存](http://www.cnblogs.com/wonyun/p/5524617.html) ([链接备份](https://web.archive.org/web/20221207135206/https://www.cnblogs.com/wonyun/p/5524617.html))
- [浏览器的缓存机制](https://web.archive.org/web/20191228165837/http://coderlt.coding.me/2016/11/21/web-cache/)
