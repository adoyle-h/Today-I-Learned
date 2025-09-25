---
title: SSL 证书校验失败
---


## 自签名的证书

错误代码：ERR_CERT_AUTHORITY_INVALID

解决方法：要么把证书导入到本地系统，并且信任。要么使用权威 CA 机构授权的证书。

## 本地系统时间不对

案例：刷 LineageOS 发现浏览器无法访问 https 的网站。总是报证书不对。

错误代码：ERR_CERT_DATE_INVALID

由于 SSL 证书指定了有效期，当系统时间与实际时间不一致时，浏览器无法验证安全证书的有效性，也会出现类似的错误，所以解决办法就是用户通过更正系统时间来修复此错误。

`adb shell` 连接安卓手机后，执行以下命令。

```sh
settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
settings put global captive_portal_https_url http://connect.rom.miui.com/generate_204
settings put global captive_portal_use_https 0
settings put global ntp_server ntp1.aliyun.com
```

进入手机的设置-时间，把自动同步时间关闭重开一下即可。

## 访问域名不匹配

错误代码：ERR_SSL_VERSION_OR_CIPHER_MISMATCH

解决方法：根据正确的域名重新制作证书。或者制作泛域名证书。
