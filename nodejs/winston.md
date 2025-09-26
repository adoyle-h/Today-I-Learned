---
title: winston 日志库
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 缺点

- 进程立刻退出后，日志没写到文件里。

### process.exit() 后，日志没写到文件里

这个现象发生在程序刚启动，创建 logger，并且执行 `logger.log()`，然后立刻 `process.exit()`。会发现日志没落盘。

解决方案是监听 [finish 事件](https://github.com/winstonjs/winston#awaiting-logs-to-be-written-in-winston)，并且调用 `logger.end()` 来触发 finish 事件，参考[例子](https://github.com/winstonjs/winston/blob/master/examples/finish-event.js)。
Issues: [#228](https://github.com/winstonjs/winston/issues/228) [#1504](https://github.com/winstonjs/winston/issues/1504)

但是官方给的例子依然有问题！针对 File Transport 是无效的，因为代码本身就有 bug！
我已经提交了 [MR](https://github.com/winstonjs/winston/pull/1868) 修正了 bug，但没人审核。所以可以先用我的 [Fork](https://github.com/adoyle-h/winston/tree/adoyle)，这个分支还修复了其他问题。
