---
title: DNS
created: 2019-09-24T21:37:50+0800
updated: 2019-09-24T21:37:50+0800
---


## DNS 搜索路径

1. 浏览器缓存
2. 本地系统缓存
3. 本地计算机 HOSTS 文件
4. 路由器缓存
4. ISP 缓存
5. 递归搜索

## 刷新 DNS 缓存

对于 Mac 系统，[刷新 DNS 缓存有问题](../mac/dns-troubles-in-mac.md)。

## /etc/resolv.conf

DNS 的配置文件

## nameserver

`nameserver x.x.x.x` 用来指定 DNS 服务器，一行 `nameserver` 指定一个 DNS 服务器，可以有多行 `nameserver`。

### search

`search` 用来设置搜索域。

比如加入这行 `search example.com app.com`。当 `nslookup a` 没有找到域名记录时，如果设置了搜索域，它会按顺序分别以 `a.example.com` 和 `a.app.com` 再次查找 DNS 记录。

### domain

用来指定本地的域名，在没有设置 `search` 的情况下，`search` 默认为 `domain` 的值。

例如 `domain mydomain.com`。
