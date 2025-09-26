---
title: 托管域名到 Cloudflare
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


记录一种申请免费域名并托管到 Cloudflare 的方法。

1. 申请域名。比如到 [CloudNS](https://www.cloudns.net/) 申请免费域名。假设申请的域名是 `yours.ip-ddns.com`。
2. 在 Cloudflare 创建/登录账号。
3. 点帐户主页 - 添加域 - 输入现有域。输入 `yours.ip-ddns.com`，选 Free 套餐，点「继续前往激活」。得到 Cloudflare 提供的 NS 地址。
4. 在 CloudNS 修改 NS 记录 `yours.ip-ddns.com`，指向 Cloudflare 提供的 2 个 NS 地址。删除另外两个 NS 记录，最后只保留 2 个 NS 记录。
5. 在 Cloudflare 的 SSL/TLS 页面，点边缘证书，点待验证。获取 TXT 记录的名称和值。
6. 在 CloudNS 中创建 2 个 TXT 记录 `_acme-challenge.yours.ip-ddns.com`。填入第 5 步获取的值。
7. 等半个小时后再来 Cloudflare 刷新网页，查看状态是否从「待验证」变为「有效」。验证 TXT 是 Cloudflare 定时执行的，没有按钮提供给用户。
8. 在 CloudNS 中创建 CNAME 记录	`*.yours.ip-ddns.com` 指向 `all.yours.ip-ddns.com`。
9. 在 CloudNS 中创建 2 个 NS 记录 `all.yours.ip-ddns.com` 指向 Cloudflare 提供的 2 个 NS 地址。
10. 在 Cloudflare 中创建 A 记录 `all.yours.ip-ddns.com` 随便指向某个 IP 地址。这个记录开启 Cloudflare Proxy。

之后所有三级域名（比如 `a.yours.ip-ddns.com`）都托管在 Cloudflare 上，无须操作 CloudNS。

但是 `yours.ip-ddns.com` 这个域名无法创建 CNAME 记录，只能创建 A/AAAA 记录。并且 SOA 记录始终在 CloudNS，没法改到 Cloudflare。
所以只能在 CloudNS 管理 `yours.ip-ddns.com` 的地址，无法托管到 Cloudflare。

## 每 3 个月重新验证 TXT 记录

因为当前每 3 个月 SSL 证书就过期，Cloudflare 会要求你创建新的 TXT 记录来验证续期。这样很麻烦。
一劳永逸的方法：在 CloudNS 里删掉 TXT 记录，然后创建 **NS 记录**，把 `_acme-challenge.yours.ip-ddns.com` 指向 Cloudflare 提供的 2 个 NS 地址。无须在 Cloudflare 里创建 TXT 记录。Cloudflare 会自动更新 SSL 证书的。
