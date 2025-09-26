---
title: RPM 创建仓库
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


有两种方式，`createrepo` 和 `createrepo_c`。

createrepo 依赖 yum，如果你没有装 yum，可以安装 createrepo_c。

## createrepo

安装 createrepo rpm 包。

使用 `createrepo` 创建本地仓库。然后在 `/etc/yum.repos.d/` 配置软件源指向本地仓库。

- http://yum.baseurl.org/wiki/RepoCreate.html
- http://createrepo.baseurl.org/index.html
- https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/sec-configuring_yum_and_yum_repositories

## createrepo_c

安装 createrepo_c rpm 包。用法跟 createrepo 一样，只不过命令是 `createrepo_c`。
