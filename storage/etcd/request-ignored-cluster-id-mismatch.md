---
title: ETCD 报错 request ignored (cluster ID mismatch)
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

## 原因

> 查看 etcd 运行日志，如果看到如下日志：

> request ignored (cluster ID mismatch)
> 是因为 cluster token 不一致，新成员接收到请求后会报出这个warning。查看官方问答，解释如下：
>
> Every new etcd cluster generates a new cluster ID based on the initial cluster configuration and a user-provided unique initial-cluster-token value. By having unique cluster ID's, etcd is protected from cross-cluster interaction which could corrupt the cluster.
>
> Usually this warning happens after tearing down an old cluster, then reusing some of the peer addresses for the new cluster. If any etcd process from the old cluster is still running it will try to contact the new cluster. The new cluster will recognize a cluster ID mismatch, then ignore the request and emit this warning. This warning is often cleared by ensuring peer addresses among distinct clusters are disjoint.
>
> 网上有文章大致说明如下：
>
> etcd cluster启动的时候通过“initial-cluster-token”参数指定集群的名称。如果一个老集群已经tear down，但是还有部分成员活着，此时在老集群之上又部署新的集群之后，那些还活着的老成员会尝试连接新集群的各个成员，因为cluster token不一致新成员接收到请求后会报出这个warning。
>
> 避免这个错误的方法就是不要使用老集群的地址。

详见 https://web.archive.org/web/20190504110907/https://bingohuang.com/etcd-operation-5/


## 解决方案

三种

1. 不使用老的集群。
2. 如果是新部署的集群，可以删掉 ETCD 的数据目录，重新部署。
3. 通过 etcdctl 或者 API 来添加/删除成员
