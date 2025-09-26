---
title: 使用 acme.sh 生成证书
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


[acme.sh](https://github.com/acmesh-official/acme.sh) 默认用的是 ZeroSSL，它需要用邮箱认证，比较麻烦。
推荐用 letsencrypt，它不需要邮箱，而且支持泛域名。

## 切换 CA

只要 acme.sh 命令加上 `--server letsencrypt` 参数即可修改 CA。

或者修改默认 CA：`acme.sh --set-default-ca --server letsencrypt`

## 安装 acme.sh

https://github.com/acmesh-official/acme.sh/wiki/How-to-install

`curl https://get.acme.sh | sh -s email=my@example.com`

## 生成证书

生成证书需要先验证域名所有权。acme.sh 有两种方式验证域名所有权。

1. 通过自建 http 服务验证。
2. 通过手动创建 DNS 的 TXT 记录验证。
3. 通过 DNS API 自动验证。

假设你要申请泛域名 `*.you.com`。

### 通过自建 http 服务验证

不好用，不解释。

### 通过 DNS 的 TXT 记录验证

你需要加上 `--dns` 参数。

`acme.sh --issue --dns --server letsencrypt -d *.you.com --yes-I-know-dns-manual-mode-enough-go-ahead-please`

它会提示你去创建一条 TXT 记录 `_acme-challenge.你的域名`，其取值填 acme.sh 告诉你的值。当你创建好后，执行：

`acme.sh --renew --dns --server letsencrypt -d *.you.com --yes-I-know-dns-manual-mode-enough-go-ahead-please`

然后它就生成了证书文件，存在 `~/.acme.sh/*.you.com_ecc/` 目录下。`*.you.com.cer` 文件是证书的公钥，`*.you.com.key` 文件是证书的私钥。

### 通过 DNS API 自动验证

只要到 DNS 服务商那里获得 API KEY，就可以用 acme.sh 来自动验证了，详见 https://github.com/acmesh-official/acme.sh/wiki/dnsapi

## 申请多个域名

可以申请多个域名，比如顶级域名和泛域名一起申请。增加 `-d` 参数就行：`-d *.you.com -d you.com`。
