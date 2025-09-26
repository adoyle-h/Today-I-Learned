---
title: docker 代理
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


因为中国已屏蔽 docker hub。需要翻墙才能访问。

解决方法：

1. 通过 registry-mirror 镜像服务器
2. 通过 http 代理服务

## 不同客户端的配置位置

### docker for mac

对于 dokcer for mac 用户，打开设置 - Docker Engine，设置 registry-mirror 配置。

### orbstack

对于 [orbstack](https://orbstack.dev/) 用户，
通过 `orb config docker` 或者在 app 界面的「设置-Docker-Advanced engine config」设置 registry-mirror 配置。
或者，通过 `orb config set network_proxy` 或者在 app 界面的「设置-Network-Proxy」设置代理。

## registry-mirror

docker [registry-mirror](https://docs.docker.com/docker-hub/image-library/mirror/) 只对 pull 镜像有效。

```json
{
  "registry-mirrors": [
    "https://镜像加速服务"
  ]
}
```

这里必须用 https，虽然可能提示证书不对。使用 http 会无效。

镜像加速服务可参考 https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6

## 代理服务

根据[这个文档](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy)，下面这种配置方式是可用的。

```json
{
  "proxies": {
    "http-proxy": "http://localhost:3128",
    "https-proxy": "http://localhost:3129",
    "no-proxy": "*.test.example.com,.example.org,127.0.0.0/8"
  }
}
```


要区分[这篇文章](https://docs.docker.com/network/proxy/#configure-the-docker-client)，下面的配置是用来配置 docker 客户端，而非 docker 服务端。它是用来设置容器的里的代理配置，而非 docker 服务器的代理配置，即不影响 docker pull。

```json
{
 "proxies": {
   "default": {
     "httpProxy": "http://proxy.example.com:3128",
     "httpsProxy": "https://proxy.example.com:3129",
     "noProxy": "*.test.example.com,.example.org,127.0.0.0/8"
   }
 }
}
```

## docker push, docker login 失败

需要通过设置[代理服务](#代理服务)来解决问题。

执行 docker login 时需要设置 HTTP_PROXY 等环境变量 `HTTP_PROXY=http://... HTTPS_PROXY=http://... docker login`。否则必定登录失败。
