---
title: rootless 问题
created: 2024-06-03T03:33:28+0800
updated: 2024-06-03T03:33:28+0800
---


## fork/exec /proc/.../exe: permission denied: unknown

当同时安装了 rootless nerdctl 和 rootless docker，会遇到该问题。无法启动容器。

这是因为 rootless 方案依赖 containerd，nerdctl 和 docker 启动的 containerd 会产生冲突。

参考 https://github.com/lima-vm/lima/issues/1641
