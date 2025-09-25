---
title: 调试 CrashLoopBackOff 状态的 Pod
---


CrashLoopBackOff 状态，之前的容器就已退出并删除了，难以复现问题。

解决方案：

```sh
POD=pod_name
kubectl get pod $POD -oyaml > debug-pod.yaml
vim debug-pod.yaml
---
title: 修改 container 加上 command: [tail, -f, /dev/null]，让它什么都不做
---

# 修改 pod name
# 删除其他不必要的参数
kubectl apply -f debug-pod.yaml
# 进入容器，然后就可以在容器内调试了
kubectl exec -it <debug_pod_name> -- sh
# 可以 inspect 镜像看看 entrypoint 和 command 是什么，在容器内执行启动命令，排查启动失败的原因
```

## 参考

- https://releasehub.com/blog/kubernetes-how-to-debug-crashloopbackoff-in-a-container
