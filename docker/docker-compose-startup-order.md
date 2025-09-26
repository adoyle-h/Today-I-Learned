---
title: docker-compose 启动容器顺序
created: 2017-07-20T22:47:16+0800
updated: 2017-07-20T22:47:16+0800
---


发现 docker-compose 的容器启动顺序并不“严格“，容器只是启动了但没有真正提供服务，compose 也算作启动了。
比如先启动 mysql，后启动依赖 mysql 的 web 服务，其实有可能 mysql 还没初始化完成，web 服务就启动了。

[这篇文章](https://docs.docker.com/compose/startup-order/)提到了处理这种问题的方法。

[wait-for-it](https://github.com/vishnubob/wait-for-it) 脚本写得很不错，但是目前只支持 linux 还不兼容 mac，详见 [issue](https://github.com/vishnubob/wait-for-it/issues/55)。

替代方案，[docker-compose-wait](https://github.com/ufoscout/docker-compose-wait)。
