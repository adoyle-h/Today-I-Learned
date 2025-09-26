---
title: aliyun cli
created: 2024-08-27T02:43:28+0800
updated: 2024-08-27T02:43:28+0800
---


https://github.com/aliyun/aliyun-cli/blob/master/README-CN.md

使用准备：先执行 `aliyun configure` 会生成 ./.aliyun/config.json

查询 API 文档：https://api.aliyun.com/

## -FILE 隐藏参数

当使用 `aliyun cdn BatchSetCdnDomainServerCertificate` 这个命令上传证书，根据官方文档，证书内容居然是整个作为字符串传参的。震惊。

根据[这个 issue](https://github.com/aliyun/aliyun-cli/issues/298) 发现，竟然还有一个隐藏参数。官方文档里居然一点都没提到。再次震惊。

我使用 [lego](https://github.com/go-acme/lego) 来生成证书，再配合 `--run-hook` 以及 `--renew-hook` 参数即可在生成证书后部署到阿里云。具体例子如下：

```sh
#!/usr/bin/env bash
# vim: ft=bash

set -o errexit -o nounset -o pipefail -o errtrace
(shopt -p inherit_errexit &>/dev/null) && shopt -s inherit_errexit

PUB=~/.lego/certificates/$1.crt
PRI=~/.lego/certificates/$1.key

args=(
 --region cn-hangzhou
 --DomainName "$2"
 --SSLProtocol on
 --CertType upload
 --SSLPub-FILE "$PUB"
 --SSLPri-FILE "$PRI"
)

aliyun cdn BatchSetCdnDomainServerCertificate "${args[@]}"
```

```sh
lego --dns alidns -d '*.xxxx.com' -d 'xxxx.com' --email '@gmail.com' \
  renew \
  --renew-hook "./cert_hook.sh _.xxxx.com cdn.xxxx.com,public.xxxx.com"
```
