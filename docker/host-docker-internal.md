---
title: host.docker.internal
created: 2024-03-29T03:03:53+0800
updated: 2024-03-29T03:03:53+0800
---


`host.docker.internal` 是 Docker 容器可访问的特殊域名。它指向宿主机的内部 IP。用途是在容器内访问宿主机 IP。

`gateway.docker.internal` 指向 docker daemon 的 gateway IP。

详见 https://docs.docker.com/desktop/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host

这在 orbstack 也依然可以用。详见 https://docs.orbstack.dev/docker/network#connecting-to-servers-on-mac
