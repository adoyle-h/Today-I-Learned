## 重启 Pod 中的容器

如果要在容器里修改代码进行调试，只有一种方法。
先进入容器，修改代码。再找到 pod 所在节点的位置，ssh 到节点，用 `docker restart` 重启容器即可。

kill 容器内的 PID 1 的进程，会导致容器重启后容器内文件也重置。除非事先挂了 volume。
