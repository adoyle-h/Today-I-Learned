---
title: 在浏览器里启动 DoH
created: 2024-04-23T05:18:33+0800
updated: 2024-04-23T05:18:33+0800
---


Chrome、Firefox、Edge、Brave 浏览器参考[这篇文章](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/)。

## Firefox Nightly

手机版 Firefox 只有 Nightly 版本可以调整。

1. 地址栏输入 `about:config` 回车进入。
2. 搜索 `network.trr.mode` 值改为 2。
  - 0 - Default value in standard Firefox installations
  - 1 - DoH is enabled, but Firefox picks if it uses DoH or regular DNS based on which returns faster query responses
  - 2 - DoH is enabled, and regular DNS works as a backup
  - 3 - DoH is enabled, and regular DNS is disabled
  - 5 - DoH is disabled
3. 搜索 `network.trr.uri` 改为 DoH 地址。比如 `https://cloudflare-dns.com/dns-query`
4. (可选) 搜索 `network.trr.bootstrapAddress`，调整 bootstrap dns 地址。

参考 https://wiki.mozilla.org/Trusted_Recursive_Resolver
