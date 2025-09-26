---
title: volume
created: 2017-09-13T00:11:46+0800
updated: 2017-09-13T00:11:46+0800
---


在 Dockerfile 中使用 Volume 关键字，例如:

```Dockerfile
Volume /home/admin/xxx/
RUN touch /home/admin/xxx/a
```

最后编译得到的镜像 /home/admin/xxx/ 是个空目录。

```Dockerfile
RUN touch /home/admin/xxx/a
Volume /home/admin/xxx/
```

得把 Volume 放在最后才行。

因为镜像编译期间其实就是跑在容器里执行命令，Volume 把 `/home/admin/xxx/` 挂载到了宿主机的某个 volume 路径，所以文件其实没有写到容器的文件里，而是写到了外部的 volume 中。
