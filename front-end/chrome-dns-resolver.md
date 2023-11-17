# Chrome 浏览器 DNS 解析

在新版的 `chrome://net-internals/#dns` 里看不到 dns nameserver 信息。
需要到 `chrome://net-export` 记录访问日志，然后用 https://netlog-viewer.appspot.com/#dns 查看 DNS 配置信息以及每条请求的 DNS 解析。

当 secure_dns_mode 为 1 时，代表开启请求 DoH 服务。它会在 nameservers 列表里选择开启 DoH 的服务，跳过不支持 DoH 的服务。

这个在 Chrome 「设置-隐私和安全-使用安全 DNS」可以设置关闭。
