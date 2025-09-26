---
title: K8S 部署踩坑记
created: 2020-05-22T00:42:35+0800
updated: 2020-05-22T00:42:35+0800
---


## failed to find subsystem mount for required subsystem: pids

看起来 `Failed to start ContainerManager failed to initialize top level QOS containers` 是关键信息，但其实是 `failed to find subsystem mount for required subsystem: pids`。

### 现象

kubelet 启动失败，`journalctl -u kubelet` 发现报错，
`kubelet.go:1380] Failed to start ContainerManager failed to initialize top level QOS containers: failed to update top level Burstable QOS cgroup : failed to set supported cgroup subsystems for cgroup [kubepods burstable]: failed to find subsystem mount for required subsystem: pids`

### 分析

根据报错信息，定位到代码是在 [setSupportedSubsystems 函数](https://sourcegraph.com/github.com/kubernetes/kubernetes@fcb01efac98b7a1aca0567ab3bc18afe528d5c22/-/blob/pkg/kubelet/cm/cgroup_manager_linux.go#L345-350)。
因此发现具体原因是 `failed to find subsystem mount for required subsystem: pids` 导致的，要看 cgroup [kubepods burstable]。
`ls /sys/fs/cgroup/systemd/kubepods/burstable/` 发现并没有 pids 目录。

[getSupportedSubsystems 函数](https://sourcegraph.com/github.com/kubernetes/kubernetes@fcb01efac98b7a1aca0567ab3bc18afe528d5c22/-/blob/pkg/kubelet/cm/cgroup_manager_linux.go#L322-334)是问题的关键点。

> func getSupportedSubsystems() map[subsystem]bool {
> 	supportedSubsystems := map[subsystem]bool{
> 		&cgroupfs.MemoryGroup{}: true,
> 		&cgroupfs.CpuGroup{}:    true,
> 		&cgroupfs.PidsGroup{}:   false,
> 	}
> 	// not all hosts support hugetlb cgroup, and in the absent of hugetlb, we will fail silently by reporting no capacity.
> 	supportedSubsystems[&cgroupfs.HugetlbGroup{}] = false
> 	if utilfeature.DefaultFeatureGate.Enabled(kubefeatures.SupportPodPidsLimit) || utilfeature.DefaultFeatureGate.Enabled(kubefeatures.SupportNodePidsLimit) {
> 		supportedSubsystems[&cgroupfs.PidsGroup{}] = true
> 	}
> 	return supportedSubsystems
> }

同时看 kubelet 的 [feature-gates](https://kubernetes.io/zh/docs/reference/command-line-tools-reference/feature-gates/)，发现 SupportPodPidsLimit 在 kubelet 1.14 之后默认是开启的。 SupportNodePidsLimit	在 1.15 之后默认开启。
而我使用的是 kubelet 1.17 版本。

> SupportPodPidsLimit: Enable the support to limiting PIDs in Pods.

找到相关 [Issue](https://github.com/kubernetes/kubernetes/issues/79046) 和 [PR](https://github.com/kubernetes/kubernetes/commit/08c258add9b9b0be4597415f0add3d8fb627ec4b)。

### 解决方案

因此解决方案是把 SupportPodPidsLimit 和 SupportNodePidsLimit 禁用掉。编辑 kubelet.env 文件（具体路径得根据你的部署路径找），KUBELET_ARGS 增加一行 `--feature-gates=SupportPodPidsLimit=false,SupportNodePidsLimit=false \`。重启 kubelet，`systemctl restart kubelet.service`。

## network plugin is not ready: cni config uninitialized

网络插件没安装好的情况下，kubelet 会报这个问题。
