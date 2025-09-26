---
title: docker desktop
created: 2023-06-26T01:18:37+0800
updated: 2023-06-26T01:18:37+0800
---


## docker desktop 登录不上账号

现象是一直卡在 `Verifying credentials...`，重试也没用。很可能是 docker 的某个域名被墙了。解决方法就是翻墙。

MacOS 解决方法：

1. 安装 [Proxifier](https://www.proxifier.com/)。
2. 在 Proxifier 里增加新的 Rule。Applications 选 `"Docker.app"; "Docker"; com.docker.docker; com.docker.backend;`，target host port 都是默认的 any，action 指向你的梯子本地监听端口。
3. 重启 docker desktop for mac。

把 docker desktop 的网络流量都通过 Proxifier 拦截并转发到梯子上。

## 下载 ghcr.io/quay.io/gcr.io 的镜像慢

即使你设置了 `{ "registry-mirrors": [ "https://dockerproxy.com" ] }` 也无效。
因为这只能代理 docker hub 的镜像，对 ghcr.io/quay.io/gcr.io 这些仓库都无效。
解决方法还是按上文那样拦截流量走翻墙。
