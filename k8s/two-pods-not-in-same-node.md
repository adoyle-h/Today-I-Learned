---
title: 多个 Pod 不重复部署在同一个节点上
---


设置 Pod 的反亲和性。以 deploy traefik 为例。

```yaml
template:
  metadata:
    labels:
      app.kubernetes.io/instance: traefik
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/name: traefik
      helm.sh/chart: traefik-10.3.0
spec:
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: app.kubernetes.io/instance
              operator: In
              values:
              - traefik
          topologyKey: kubernetes.io/hostname
```

- topologyKey 固定是 "kubernetes.io/hostname" 就可以。
- labelSelector 根据实际的 label 来填。

注意 podAntiAffinity 不能是 requiredDuringSchedulingIgnoredDuringExecution，得用 preferredDuringSchedulingIgnoredDuringExecution。
两个原因：

1. 因为 deploy 可能会同时有两个 rs 做 scale down/up。就有可能导致每个节点已经有一个 pod，但是两个 rs 的 pod 都没满的情况。
2. 因为不能保证 Pod 数量一定小于节点数量，如果 scale 超过节点数，就会导致多余的 Pod 部署失败。

由于 preferredDuringSchedulingIgnoredDuringExecution，也因此不能保证一定不重复在一个节点上
