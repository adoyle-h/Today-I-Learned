---
title: OverlayFS
created: 2021-10-24T23:32:40+0800
updated: 2021-10-24T23:32:40+0800
---


[Overlay Filesystem](https://www.kernel.org/doc/html/latest/filesystems/overlayfs.html)

![overlay.jpeg](https://jvns.ca/images/overlay.jpeg)

### OverlayFS 的基本概念

- lowerdir 是只读层，不能被修改。lower 层支持多个目录，用 `:` 间隔，优先级依次降低。最多支持500层。
- upperdir 是可读写的，中对文件的创建、修改、删除操作都在这一层体现。
- mergeddir 是 lowerdir 和 upperdir 里的所有文件合并后的挂载目录。用户最终看到的目录。
  - lowerdir 和 upperdir 目录存在同名文件时，lowerdir 的文件将会被隐藏，用户只能看到 upperdir 的文件。
  - lowerdir 低优先级的同目录同名文件将会被隐藏。
  - 如果存在同名目录，那么 lowerdir 和 upperdir 目录中的内容将会合并。
  - 当用户修改 mergedir 中来自 upperdir 的文件时，修改直接写入 upperdir 中原来目录中，删除文件也同理。
  - 当用户修改 mergedir 中来自 lowerdir 的文件时，lowerdir 的文件不变。overlayfs 会先把 lowerdir 的文件拷贝一份到 upperdir，然后修改 upperdir 里的这个副本，lowerdir 里的原文件将被隐藏。
- workdir 用来存放文件中间修改过程中产生的临时文件。必须是空目录，且与 upperdir 在相同的文件系统里。

### 使用方法

`mount -t overlay overlay -olowerdir=/lower,upperdir=/upper,workdir=/work /merged`

### 参考

- https://jvns.ca/blog/2019/11/18/how-containers-work--overlayfs/
