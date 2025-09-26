---
title: K8S 资源规划
created: 2020-05-18T00:48:40+0800
updated: 2020-05-18T00:48:40+0800
---


1. [为系统守护进程预留计算资源](https://kubernetes.io/zh/docs/tasks/administer-cluster/reserve-compute-resources/)，Kubelet Flag:
  - Kube 预留值 --kube-reserved 和 --kube-reserved-cgroup
  - 系统预留值 --system-reserved 和 --system-reserved-cgroup
  - 预留 CPU --reserved-cpus
  - 驱逐阈值 --eviction-hard
2. Namespace ResourceQuota
3. Container resource limit request
