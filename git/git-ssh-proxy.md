---
title: git ssh 代理
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


`.gitconfig` 只能改走 http 和 https 协议的代理。
对于走 ssh 协议，要改的是 `~/.ssh/config`。

```
Host github github.com *.github.com
Hostname github.com
User git
ProxyCommand=nc -X 5 -x localhost:1080 %h %p
```

参考 https://www.mikeheijmans.com/sysadmin/2014/08/12/proxy-ssh-over-socks/
