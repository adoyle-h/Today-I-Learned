---
title: fakeroot
created: 2024-04-28T22:58:03+0800
updated: 2024-04-28T22:58:03+0800
---


[fakeroot](https://wiki.debian.org/FakeRoot) 类似 sudo。只不过实际上它没有 root 权限，只不过让进程以为自己有 root 权限。通常用在编译场景。

fakeroot 是 C/S 架构，fakeroot 是 client，faked 是 server。执行 fakeroot 会自动启动 faked。

- https://tracker.debian.org/pkg/fakeroot
- https://manpages.debian.org/testing/pseudo/fakeroot.1.en.html
