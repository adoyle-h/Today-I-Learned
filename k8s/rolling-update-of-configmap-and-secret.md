---
title: configmap 和 secret 的滚动更新
---


configmap 和 secret 作为容器的环境变量时，pod 是不会随着 configmap/secret 内容变化而自动更新的。

解决方案有三种：

1. configmap/secret 的 name 带上 hash
2. Pod 的 metadata.annotations 带上 hash
3. 用 controller 监听 configmap/secret 的变化，从而触发滚动更新

## configmap/secret name hash

hash 根据内容计算得到。

## Pod metadata.annotations hash

hash 根据内容计算得到。

## controller watching

https://github.com/stakater/Reloader
