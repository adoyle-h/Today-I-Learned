---
title: K8S Dashboard
---


https://github.com/kubernetes/dashboard

## 开启 http

官方默认是 https 服务。需要修改以下几处开启 http 服务，
参考 https://vividcode.io/disable-authentication-and-https-in-kubernetes-dashboard/

1. kubectl -n kube-system deploy kubernetes-dashboard 添加 ports，http 监听 9090 端口，https 是监听 8443 端口。
2. kubectl -n kube-system deploy kubernetes-dashboard 修改容器 args。
  - 移除 `--auto-generate-certificates`
  - 增加 `--enable-skip-login`, `--disable-settings-authorizer`, `--enable-insecure-login`
  - `--insecure-bind-address=0.0.0.0` 在 dockerfile entrypoint 里已经加了，可以不用加。
3. kubectl -n kube-system service kubernetes-dashboard 添加 9090 端口
4. ingress 增加对应的 route

「推荐这种方式」如果你只想用 https，只是支持跳过登录。那么

1. kubectl -n kube-system deploy kubernetes-dashboard 修改容器 args。
  - 只增加 `--enable-skip-login`，其他都不用删改。
2. ingress 增加对应的 route
  - 如果用 traefik ingress，可以修改 deploy 开启 `insecureSkipVerify` 选项，让 traefik 可以正常访问 https 后端服务。


## Not Found (404) 无限重定向

看前端请求记录，有一个请求返回了 404 错误，响应内容为 `the server could not find the requested resource`。然后发生重定向。

目测这是由于请求数据没查到，没查到可能是因为你的 Metric Server 出问题了。
同时前端对数据不存在的情况处理的不好。

解决方案：

1. 遇到这种情况就直接改 url 访问，不要管重定向。比如 `/#!/namespace`。
2. 要么修正 Metric Server 的问题，要么别点会需要用到 Metric 数据的页面链接。

相关 [Issue](https://github.com/kubernetes-sigs/kubespray/issues/5347)，这个问题将在 [dashboard 2.0](https://github.com/kubernetes-sigs/kubespray/issues/5347#issuecomment-619543133) 解决。

## User "system:serviceaccount:kube-system:kubernetes-dashboard" cannot list resource

这是因为默认的 rolebinding kubernetes-dashboard-minimal 权限太小了。
直接 `kubectl create clusterrolebinding kubernetes-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard` 授予全部权限完事。

可以自己创建账号控制权限，用 token 登录。详见[这里](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)。
