---
title: 查看 Chrome 通知历史列表
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


以下对于 Mac 用户来说。

Chrome 通知默认不是使用 Mac 的通知栏，所以很难找到通知历史。
在 chrome 地址栏访问 chrome://flags/ ，打开 `Enable native notifications` 选项。之后就可以查看 Mac 的通知栏了。

还有，`cd ~/Library/Application\ Support/Google/Chrome/Default/Platform\ Notifications/`，
通知日志在这个目录下的 `000003.log` 文件里。
