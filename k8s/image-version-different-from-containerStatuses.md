---
title: Pod containerStatuses 的镜像版本与 Pod 指定版本不同
created: 2021-10-24T23:32:40+0800
updated: 2021-10-24T23:32:40+0800
---


> If the same ID docker image has many tags, kubelet just pick the first one.

详见这个 [issue](https://github.com/kubernetes/kubernetes/issues/74081#issuecomment-463887854)。
