---
title: Chrome Stalled 请求
created: 2025-03-26T04:42:09+0800
updated: 2025-03-26T04:42:09+0800
---


当打开 Chrome 开发者工具发现请求网页时一直卡在 stalled 状态。如何排查问题？

1. 关闭其他网页，进入隐身模式，只请求当前要排查的网页。
2. 关闭浏览器进程。在终端以监听日志方式打开浏览器：`/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --enable-logging --v=1`。访问网页，观察终端的日志输出。
