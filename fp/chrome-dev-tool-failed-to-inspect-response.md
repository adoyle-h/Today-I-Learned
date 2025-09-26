---
title: chrome 开发者工具观察响应 Failed to load response data
created: 2018-01-23T23:52:33+0800
updated: 2018-01-23T23:52:33+0800
---


在前端更改 window.location 做跳转，想在 chrome 开发者工具中观察跳转之前发的一个 xhr 请求，勾上了 Preserve log，发现请求是 200 status code，但是 Response 是 Failed to load response data。

原来是 chrome 的一个 Bug: https://stackoverflow.com/a/38925237

解决方法也在链接里提到，

> This is a known issue, that's been around for a while, and debated a lot. However, there is a workaround, in which you pause on onunload, so you can view the response before it navigates away, and thereby doesn't lose the data upon navigating away.
