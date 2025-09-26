---
title: 查找 Overlay ID 与哪个容器相关
created: 2021-09-27T13:14:44+0800
updated: 2021-09-27T13:14:44+0800
---


<!-- {% raw %} -->
`docker inspect -f $'{{.Name}}\t{{.GraphDriver.Data.MergedDir}}' $(docker ps -aq) | grep -i <overlay-id>`
<!-- {% endraw %} -->

## 案例

找到占用硬盘空间较大的 overlay `du -h -d 1 /disk1/docker/overlay/`，目录名即 overlay id。
