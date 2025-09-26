---
title: ContainerD OverlayFS
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


OverlayFS 概念见[这里](../linux/overylay-fs.md)。

## 目录结构

```
containerd/
├── bin/
├── containerd.log
├── io.containerd.content.v1.content/
│   ├── blobs/
│   └── ingest/
├── io.containerd.grpc.v1.cri/
│   ├── containers/
│   └── sandboxes/
├── io.containerd.metadata.v1.bolt/
│   └── meta.db
├── io.containerd.runtime.v1.linux/
├── io.containerd.runtime.v2.task/
│   └── k8s.io/
├── io.containerd.snapshotter.v1.fuse-overlayfs/
│   └── snapshots/
├── io.containerd.snapshotter.v1.native/
│   └── snapshots/
├── io.containerd.snapshotter.v1.overlayfs/
│   ├── metadata.db
│   └── snapshots/
├── io.containerd.snapshotter.v1.stargz/
│   └── snapshotter/
├── lib/
└── tmpmounts/
```

- io.containerd.content.v1.content/blob/ : 存放镜像对应的 config、index、layer、manifest。layer 是 gzip 文件，其他的是 json 文件。可以用 `ctr content ls` 查看
- io.containerd.snapshotter.v1.overlayfs/snapshots/ : 子目录是 layer gunzip 解压后的文件夹。overlayfs 的 upperdir。可以用 `ctr snapshot ls` 查看。除了 root snapshot，每个 snapshot 都有个 parent，形成层叠。
- io.containerd.runtime.v2.task/ : overlayfs 的 mergeddir，容器所见的目录。


## 参考

- https://github.com/containerd/containerd/blob/main/docs/content-flow.md
