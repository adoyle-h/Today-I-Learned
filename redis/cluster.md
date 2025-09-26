---
title: Redis Cluster
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 不能在 Redis Cluster 上执行 SUNION 等命令

> Redis Cluster implements all the single key commands available in the non-distributed version of Redis. Commands performing complex multi-key operations like Set type unions or intersections are implemented as well as long as the keys all belong to the same node.
> —— [Implemented subset](https://redis.io/docs/reference/cluster-spec/)

所以不能再 Redis Cluster 上执行多个 key 操作的命令，SINTER、SUNION、SDIFF、ZUNIONSTORE、ZINTERSTORE 都是不能使用的。（即使没报错，结果也是不正确的）
