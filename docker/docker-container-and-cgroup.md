---
title: Docker 容器与 Cgroup
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


docker 容器 ID 与 Cgroup 的关系：

> On older systems with older versions of the LXC userland tools, the name of the cgroup is the name of the container. With more recent versions of the LXC tools, the cgroup is lxc/<container_name>.

> For Docker containers using cgroups, the container name is the full ID or long ID of the container.

https://docs.docker.com/config/containers/runmetrics/#find-the-cgroup-for-a-given-container
