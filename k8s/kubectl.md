---
title: kubectl 学习
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


必读：

- https://kubectl.docs.kubernetes.io/

## CheatSheet

- [官方 CheatSheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubectl Kubernetes CheatSheet](https://github.com/dennyzhang/cheatsheet-kubernetes-A4)

## kubeconfig 配置

[定义多个 kubeconfig 配置文件](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/)

https://ahmet.im/blog/mastering-kubeconfig/

## 强制删除资源

```sh
#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail

if [[ $# == 0 ]]; then
  cat <<EOF
Usage: $0 <type> <name> [<ns>=kube-system]
EOF
  exit 0
fi

type=$1
name=$2
ns=${3:-kube-system}

kubectl delete "$type" "$name" -n "$ns" --grace-period=0 --force &
kubectl patch "$type" "$name" -n "$ns" -p '{"metadata":{"finalizers":null}}'
```

## Label 相关操作

- 列出指定资源的 Label: `kubectl get --show-labels <资源>`
- 删除名为 app 的 Label: `kubectl label service my-service app-`

## 重新运行 Job

2 种方法。

1. 删除 job，重新 apply 该 job。
2. `kubectl create job --from=job/<job-name> <job-name>`
