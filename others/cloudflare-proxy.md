# cloudflare proxy

cloudflare 的每个 DNS 记录可以开启或关闭代理功能，即反向代理。
关闭代理，客户端解析 DNS 记录看到的是目标站点的 IP。
开启代理，客户端解析 DNS 记录看到的是 Cloudflare 的服务器 IP。

## 好处

- 负载均衡
- 防范攻击: 配备反向代理后，网站或服务无需透露其源服务器的 IP 地址。并且 cloudflare 提供防御 DDOS 攻击的功能。
- 全局服务器负载平衡 (GSLB): 在这种负载均衡形式中，一个网站可以分布在全球各地的多个服务器上，反向代理会将客户端发送到地理位置上最接近它们的服务器。
- 缓存: 反向代理还可以缓存内容，从而提高速度。
- SSL 加密: 加密和解密每个客户端的 SSL（或 TLS）通信对于源服务器可能需要耗费大量计算资源。可以配置由反向代理解密所有传入请求并加密所有传出响应，腾出源服务器上的宝贵资源。

## 限制

默认情况下，可以为 A、AAAA、CNAME DNS 记录代理 HTTP/HTTPS 请求。

要在非标准端口上代理 HTTP/HTTPS 请求，或代理基于 TCP、UDP 的请求，要使用 [Cloudflare Spectrum](https://www.cloudflare.com/zh-cn/application-services/products/cloudflare-spectrum/)。

## 规则

Cloudflare 的规则只针对开启代理的 DNS 有效。

对于 CNAME 也是一样。假设有 a 和 b 两个 dns 记录。b 已开启代理，并在规则命中范围内，并且 a CNAME 到 b。如果 a 开启代理，则会命中规则。若没有开启代理，则不会命中规则。
