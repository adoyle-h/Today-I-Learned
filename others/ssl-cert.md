---
title: SSL 证书
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 证书格式

- X.509
- PKCS#12
- PKCS#7

X.509 是最常用的。

### X.509

文件内容格式

```
-----BEGIN CERTIFICATE-----
（加密编码的X.509证书内容）
-----END CERTIFICATE-----
```

或

```
-----BEGIN X.509 CERTIFICATE-----
（加密编码的X.509证书内容）
-----END X.509 CERTIFICATE-----
```

或

```
-----BEGIN TRUSTED CERTIFICATE-----
（加密编码的X.509证书内容）
-----END TRUSTED CERTIFICATE-----
```

## 编码

- DER - Distinguished Encoding Rules。二进制格式。
- PEM - Privacy Enhanced Mail。DER 编码 + 对称加密 + 元信息字段 + Base64 编码。

## 文件类型

- CRT - 常见于 UNIX/LINUX 系统的证书。通常是 PEM 编码，也可以是 DER 编码。
- CER - 常见于 Windows 系统的证书。通常是 DER 编码，也可以是 PEM 编码。
- KEY - 通常用来存放一个公钥或者私钥。不是证书。编码可以是 PEM 或 DER。
- CSR - Certificate Signing Request，即证书签名请求。这个不是证书，而是向权威证书颁发机构获得签名证书的申请。其核心内容是一个公钥（当然还附带了一些别的信息），在生成这个申请的时候，同时也会生成一个私钥。
- PFX/P12 - predecessor of PKCS#12。对 Unix/Linux 服务器来说，一般 CRT 和 KEY 是分开存放在不同文件中的。但 Windows 的 IIS 则将它们存在一个 PFX 文件中。

## 查看证书信息

x.509 证书 `openssl x509 -noout -text -in <certfile>`

## 有效时间 Not After

2017/03 CA/Browser 组织通过[第 193 号提案](https://cabforum.org/2017/03/17/ballot-193-825-day-certificate-lifetimes/)：
从 2018/03/01 起，所有公开受信任的 SSL 证书最长有效期由 3 年缩减至 825 天。

CA/Browser 组织虽然没通过[Ballot SC22](https://cabforum.org/2019/09/10/ballot-sc22-reduce-certificate-lifetimes-v2/)，但是各大浏览器厂商依然在 2020/09/01 起，所有公开受信任的 SSL 证书最长有效期由 825 天缩减至 398 天。

## [生成免费证书](./acme-cert.md)
