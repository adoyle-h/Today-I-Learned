---
title: K8S 垃圾回收 (GC)
---


需要回收的是无用的 pod、container、image。

需要修改 kubelet 的启动参数。

https://kubernetes.io/docs/concepts/architecture/garbage-collection/

但是 kubelet configuration 还是 [v1beta1](https://kubernetes.io/docs/reference/config-api/kubelet-config.v1beta1/#kubelet-config-k8s-io-v1beta1-KubeletConfiguration)，参数与文档对不上。与 [kubelet arguments](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) 也对不上。
