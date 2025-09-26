---
title: Pod containerStatuses 的镜像版本与 Pod 指定版本不同
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


> If the same ID docker image has many tags, kubelet just pick the first one.

详见这个 [issue](https://github.com/kubernetes/kubernetes/issues/74081#issuecomment-463887854)。
