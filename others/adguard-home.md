---
title: adguard home
created: 2023-11-17T23:28:28+0800
updated: 2023-11-17T23:28:28+0800
---


## 开启 DoH

默认配置不开启 DoH。开启需要满足以下条件：

1. 有公网 IP。（为什么一定要有公网 IP ？因为免费 CA 服务商无法为局域网 IP 签发证书）
2. 申请 SSL 证书。
3. 修改 adguard home 的配置。

具体设置步骤详见 https://github.com/AdguardTeam/AdGuardHome/wiki/Encryption

开启后通过 https://your-ip/dns-query 来访问 DoH，或者 tls://your-ip:853 来访问 DoT。

如果不开启 DoH，记得把浏览器的「使用安全 DNS」选项关闭，否则浏览器不会请求 adguard home，详见「[Chrome 浏览器 DNS 解析](../front-end/chrome-dns-resolver.md)」。

## 设置 dns 过滤规则

推荐把规则写到文件里管理。adguard-home 配置项 `upstream_dns_file`。

详见 https://github.com/AdguardTeam/AdGuardHome/wiki/Configuration#upstreams-from-file
