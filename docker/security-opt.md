---
title: docker security_opt
---


使用 mysql 容器时，如果没设置 `seccomp:unconfined`，mysql 日志会报 `mbind: Operation not permitted`。

例子，

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_DATABASE: website
      MYSQL_ROOT_HOST: '%'
      MYSQL_ROOT_PASSWORD: test
    security_opt:
    - seccomp:unconfined
    ports:
    - 13306:3306
```

具体参考 https://docs.docker.com/engine/security/seccomp/
