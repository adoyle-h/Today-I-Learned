## etcdctl

[官方文档](https://github.com/etcd-io/etcd/tree/master/etcdctl)

etcdctl v3.4 版本之前，需要设置环境变量 `ETCDCTL_API=3` 来访问 v3 API，否则默认用的是 v2 API。
v3.4 版本之后，默认访问 v3 API。

### 列出所有的 key

`etcdctl --endpoints=http://<etcd_ip>:2379 get '' --prefix --keys-only`

K8S 的 key 都是 `/` 开头的。所以可查询 `etcdctl --endpoints=http://<etcd_ip>:2379 get / --prefix --keys-only`
