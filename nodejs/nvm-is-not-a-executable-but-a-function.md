---
title: nvm 不是一个可执行文件，而是一个函数
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


当你安装完 nvm，执行 `which nvm` 却会发现没有输出，并且 exit code 是 1。别慌，这是正常的。

因为 nvm 只是一个函数。

试试 `type -t nvm`，你会发现输出 `function`。

编写 shell 脚本时可能会踩到这个坑，特此记录。


详解：

- https://stackoverflow.com/a/26820817/4622308
- https://github.com/creationix/nvm/issues/540
