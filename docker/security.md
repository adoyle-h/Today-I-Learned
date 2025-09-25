---
title: Docker 安全
---


docker 为了便于用户使用，在网络配置上是非常宽松的。（太严格，小白用户就用不起来了）
这就导致在生产环境运行 docker 默认配置，会有很大的安全隐患。

因此建议这么做：

1. 强烈推荐按照这个 [Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html) 来加强安全设置。
2. 容器以 [rootless 模式](https://docs.docker.com/engine/security/rootless/)运行。
3. 参考[官方 Docker security](https://docs.docker.com/engine/security/)。
