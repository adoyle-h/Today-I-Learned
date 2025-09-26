---
title: DoH 与 DoT
created: 2021-11-12T17:06:12+0800
updated: 2021-11-12T17:06:12+0800
---


DNS over TLS (DoT) 和 DNS over HTTPS (DoH) 比传统的 DNS 解析更安全。

详见 [Google Public DNS 指南 - DNS 安全传输](https://developers.google.com/speed/public-dns/docs/secure-transports) ([链接备份](https://web.archive.org/web/20230226194833/https://developers.google.com/speed/public-dns/docs/secure-transports?hl=zh-cn))

## DoH 在线服务

- RFC 8484 https://dns.google/dns-query{?dns}
  - For POST the URL is just https://dns.google/dns-query and the body of the HTTP request is the binary UDP DNS payload with content type application/dns-message.
  - For GET this is `https://dns.google/dns-query?dns=BASE64URL_OF_QUERY`.
- JSON API https://dns.google/resolve{?name}{&type,cd,do,…}
  - More GET parameters are described on the JSON API page. Only the `name` parameter is required.
- https://cloudflare-dns.com/dns-query 或者 https://1.1.1.1/dns-query
  - 详见 https://developers.cloudflare.com/1.1.1.1/dns-over-https/request-structure

## 自建 DoH 服务

可以利用 CF 提供的 [cloudflared](https://developers.cloudflare.com/1.1.1.1/dns-over-https/cloudflared-proxy) 程序。
