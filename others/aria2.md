---
title: aria2
created: 2023-11-07T04:38:50+0800
updated: 2023-11-07T04:38:50+0800
---


aria2.conf 的路径配置不支持 `~` 或 `$HOME`，只支持 `${HOME}`。

aria2 支持代理。可使用[环境变量](https://aria2.github.io/manual/en/html/aria2c.html#environment)，或者[参数](https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-https-proxy)。

aria2 的磁力链接或 BT 链接，必须要配置 tracker 才能使用。推荐使用 https://github.com/XIU2/TrackersListCollection
