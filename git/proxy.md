---
title: git proxy
---


## 对于 http 和 https 网络协议

```
[http "http://github.com"]
    proxy = socks5://127.0.0.1:7890
[https "https://github.com"]
    proxy = socks5://127.0.0.1:7890
```

这里的 `127.0.0.1:7890` 改成你的代理监听的端口。

这个只会对 github.com 域名下的 git 操作起作用。
如果要针对所有的 http/https 网站，可以这么设置。

```
[http]
    proxy = socks5://127.0.0.1:7890
[https]
    proxy = socks5://127.0.0.1:7890
```

参考 [Configure Git to use a proxy](https://gist.github.com/evantoli/f8c23a37eb3558ab8765)

## 对于 git 网络协议

需要修改 `~/.ssh/config` 文件。

```
Host github.com
User git
ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
```

这里的 `127.0.0.1:7890` 改成你的代理监听的端口。

参考 https://gist.github.com/chenshengzhi/07e5177b1d97587d5ca0acc0487ad677
