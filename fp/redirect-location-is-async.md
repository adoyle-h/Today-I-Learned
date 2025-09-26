---
title: 重定向 window.location 是异步的
created: 2018-01-23T23:52:33+0800
updated: 2018-01-23T23:52:33+0800
---


发现 window.location.href = url，不会立即跳转，而是会把剩下的 js 代码都加载完后才跳转页面。interesting

> 因为 LocationChange 行为在浏览器内核中是起定时器异步执行的，代码可以参见 Chromium 源码 NavigationScheduler::ScheduleFrameNavigation。
> 异步执行的好处是为了防止代码调用过深，导致栈溢出，另外也是为了防止递归进入加载逻辑，导致状态紊乱，保证导航请求是顺序执行的。
> [window.location.href跳转页面详细过程是怎么样的？](https://www.zhihu.com/question/29890952/answer/207444783)
