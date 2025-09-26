---
title: 容器里装 K3S
---


目前卡在问题一，方案未成功。记录一下折腾的方案。

## compose.yaml 配置

```yaml
version: '3'
services:

  server:
    image: "rancher/k3s:v1.22.5-k3s1"
    command: server
    ulimits:
      nproc: 65535
      nofile:
        soft: 65535
        hard: 65535
    privileged: true
    network_mode: host
    # ipc: host
    restart: always
    environment:
    - K3S_TOKEN=${K3S_TOKEN:?err}
    - K3S_KUBECONFIG_OUTPUT=/output/kubeconfig.yaml
    - K3S_KUBECONFIG_MODE=666

    volumes:
    # 把 /var/run 都挂载到容器里
    - /run:/run
    - /var/run:/var/run

    # rancher/k3s image 设置了这几个 volume。必须重新映射到本机目录，否则 docker 会映射到随机目录。
    # 导致宿主机和容器的 /var/lib/kubelet 不一致而出问题
    - /var/lib/cni:/var/lib/cni
    - /var/lib/kubelet:/var/lib/kubelet
    - /var/log:/var/log

    # k3s 配置
    - ./k3s-server-conf.yaml:/etc/rancher/k3s/config.yaml
    # k3s 数据
    - ./var_lib_rancher_k3s:/var/lib/rancher/k3s
    # 为了得到 kubeconfig 文件
    - ./data:/output
```

## k3s 配置

k3s-server-conf.yaml 文件内容：

```yaml
node-name: m1
# docker: true
container-runtime-endpoint: unix:///run/containerd/containerd.sock
pause-image: rancher/pause:3.6

data-dir: /var/lib/rancher/k3s

kube-apiserver-arg:
  feature-gates=EphemeralContainers=true
kubelet-arg:
  cgroup-driver=systemd
# kube-scheduler-arg:
# kube-controller-manager-arg:
# kube-cloud-controller-manager-arg:
# kube-proxy-arg:
# etcd-arg:
```

容器内的 k3s 连接宿主机运行的 containerd 或者 dockerd。即 Docker-out-of-Docker 方案。

这样能启动 K3S，只是仍有问题。

## 问题一

K8S 的 projected volume 是以 tmpfs 保存的。比如 POD 无法获得 ServiceAccountToken。

比如 `/var/lib/kubelet/pods/a2c46529-1a61-4834-858b-b154a9fed484/volumes/kubernetes.io~projected/kube-api-access-s42f6` 这里面的文件，在宿主机上是空的。但在 k3s 容器里是有文件的。
因为宿主机没法访问容器内的 tmpfs 文件。导致 POD 无法正常启动。
