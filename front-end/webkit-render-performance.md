---
title: Webkit 浏览器渲染效率
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


Webkit 渲染流水线

![](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

我们期望高效的渲染

![](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-no-layout-paint.jpg)

渲染的大部分工作在于 layout 和 paint，跟其他步骤相比，比重大概有 9:1。

[CSS Triggers][] 查询 CSS 属性修改对于 layout、paint、composite 的影响。

## 线程

避免长时间阻塞主线程，因为 layout、paint、composite 都在主线程进行。
使用线程来分摊工作量。

## requestAnimationFrame
> 对于动画效果的实现，避免使用setTimeout或setInterval，请使用requestAnimationFrame。

注意 requestAnimationFrame 的浏览器支持。

## [worker][]

使用 [padolsey/operative](https://github.com/padolsey/operative) 兼容不支持 worker 的浏览器。

## GPU 渲染

对于在独立的渲染层 (layer) 进行 transforms 或 opacity 操作，会使用 GPU 渲染。

使用 `will-change: transform;` 或 `transform: translateZ(0);`，提升到独立的渲染层。

大部分 CSS 元素都不会被 GPU 优化，主要就 transforms 和 opacity。

[优先使用渲染层合并属性、控制层数量](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count?hl=zh-cn)

## 先读后写

对于读写 dom 元素的属性要慎重，尽可能避免触发 layout。layout 的工作量比较大，对性能影响较大。

使用 [wilsonpage/fastdom](https://github.com/wilsonpage/fastdom) 确保先读后写。

## 参考

- https://developers.google.com/web/fundamentals/performance/rendering/
- http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
- [为什么说 DOM 操作很慢](https://leozdgao.me/why-dom-slow/)
- [Myth Busting: CSS Animations vs. JavaScript](https://css-tricks.com/myth-busting-css-animations-vs-javascript/)

[CSS Triggers]: https://csstriggers.com/
[worker]: https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
