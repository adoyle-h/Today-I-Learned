---
title: Containerd
created: 2021-11-28T01:17:57+0800
updated: 2021-11-28T01:17:57+0800
---

## 基本概念

- [namespace](#ctr-命名空间)
- image
- container
- task
- content
- leases
- snapshot
- plugin

https://containerd.io/scope/#scope 可以看到 containerd 的功能规划。

## 进程结构

- containerd 创建子进程 containerd-shim-runc-v2
  - 注意 containerd-shim-runc-v2 的父进程是 PID 1，这是为了防止 containerd 崩溃时，不影响容器。
  - containerd-shim-runc-v2 会监控容器进程，并上报信息给 containerd
- containerd-shim-runc-v2 创建子进程 runc
- runc 创建子进程：容器进程。容器进程运行后，runc 进程退出，容器进程由 containerd-shim-runc-v2 接管。

## config.toml

containerd 的配置文件路径默认是 `/etc/containerd/config.toml`。
如果这个文件没有，可以自己创建。`containerd config default | sudo tee /etc/containerd/config.toml`

目录结构和配置具体见 https://github.com/containerd/containerd/blob/main/docs/ops.md

### 镜像加速

修改 config.toml 配置文件。

下面这种写法已废弃。

```
[plugins."io.containerd.grpc.v1.cri".registry.mirrors]
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
    endpoint = ["http://local-registry-mirror"]
```

（顺便吐槽 TOML 语法，在深度嵌套的情况下，冗余字段太多了）

应当使用这种写法：

首先创建文件，比如如果要加速 docker.io 下的镜像，就得创建目录：

```
/etc/containerd/certs.d
└── docker.io
    └── hosts.toml
```

```sh
cat <<EOF > /etc/containerd/certs.d/docker.io/hosts.toml
server = "https://docker.io"

[host."https://dockerproxy.com"]
  capabilities = ["pull", "resolve"]
EOF
```

具体配置详见 https://github.com/containerd/containerd/blob/main/docs/cri/config.md#registry-configuration

镜像站详见 https://tools.adoyle.me/docker/#%E9%95%9C%E5%83%8F%E5%8A%A0%E9%80%9F

然后重启 containerd 使之生效。

## [rootless containerd](./rootless-containerd.md)

## crictl

[crictl](https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md) 是遵循 CRI 接口规范的 kubelet 专用 CLI 工具。用来检查和管理 kubelet 节点上的容器运行时和镜像。

## ctr

ctr 是 containerd 的客户端 CLI，类似简单版的 docker 客户端。

### ctr 命名空间

```sh
# ctr 用 namespace 分离数据，一般来说 docker 对应 `moby`，k8s 对应 `k8s.io`，buildkit 对应 `buildkit`。
$ ctr ns ls
NAME LABELS
buildkit
k8s.io
moby
```

所有 ctr 一般都要带上 `-n <namespace>` 指定命名空间，否则用的是 default 命名空间，通常这个命名空间都没有东西。

> If you do not provide a namespace, ctr client commands will all use the default namespace, which is simply named "default".

https://github.com/containerd/containerd/blob/main/docs/namespaces.md#inspecting-namespaces

### ctr 基本操作

```sh
# 等价于 docker ps
$ ctr -n moby containers ls
CONTAINER                                                           IMAGE    RUNTIME
49b6578cad79f499f14006847befc34949739ff191e05511c364ce040864eeb1    -        io.containerd.runc.v2

# 等价于 docker images。但一般来说是空的，因为 docker images 元数据都存在 docker 的 data 目录，不在 containerd 的目录下。
$ ctr -n moby images ls
REF TYPE DIGEST SIZE PLATFORMS LABELS

# k8s 直接使用 containerd，所以能看到镜像列表
$ ctr -n k8s.io images ls
REF TYPE DIGEST SIZE PLATFORMS LABELS
docker.io/rancher/pause:3.6 application/vnd.docker.distribution.manifest.list.v2+json sha256:036d575e82945c112ef84e4585caff3648322a2f9ed4c3a6ce409dd10abc4f34 292.4 KiB linux/amd64,linux/s390x,windows/amd64 io.cri-containerd.image=managed

# 列出镜像和容器等内容。这里的 DIGEST 对应 docker image 的 RepoDigests
$ ctr -n moby content ls
DIGEST                                                                  SIZE    AGE             LABELS
sha256:036d575e82945c112ef84e4585caff3648322a2f9ed4c3a6ce409dd10abc4f34 1.452kB 2 hours         -
sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300 1.638kB 7 days          -
sha256:239a084766f3ebab94cba271f15bb0d4a93a6727bf8aa7f8e80eb5ebe0ea8166 1.076kB 7 days          -
sha256:3532a0050f8ec628e5d8dc9b16d8d6f97204d6893bb271063aa24edf1f6fc9cc 1.047kB 24 hours        -
sha256:396663e3d1c6102ea20893bf62a4693177dbe6b7463b961c56e6b62f81078070 4.501kB 7 days          -
sha256:58a917928b05ecfd19725325e1a5e0ed82994636114cab97b5fdb7fa8b431f06 946B    7 days          -
sha256:63a01e508ada5a123942b5afe24105d738f98ce543381ff48b1f9f905c22845e 1.159kB 2 hours         -
sha256:74bf6fc6be13c4ec53a86a5acf9fdbc6787b176db0693659ad6ac89f115e182c 526B    2 hours         -
sha256:87e303efe2f359ff82a6a61f4015c5f1cb5b49f6d679e34c9eb36fc0db5c6adb 740B    7 days          -
sha256:a2ec07de39cf5efd201ceb04403e1762ea296fb1c5d4b7e2175c11c8bf0b7f71 1.638kB 7 days          -
sha256:cffc8dd2df93619abeecc219fec2f2070a130cb26698a1bbea65ee002ccec432 736B    24 hours        -
sha256:d73ca8aeb30461ac010b03e9759b98e86bda9898ca5f6ec9a14bc3193de1a2c4 1.862kB 7 days          -
sha256:e7d88de73db3d3fd9b2d63aa7f447a10fd0220b7cbf39803c803f2af9ba256b3 528B    7 days          -
```

## 用 ctr 停止容器

`ctr container` 只有 `rm` 命令，没有 `stop` 命令。

要停止容器需要执行 `ctr task kill`。

```sh
# 查看运行中的 task
$ ctr -n k8s.io task ls
TASK                                                                PID       STATUS
33c2291ab2ab21829cf4ad55bebcb03ca841f1b6577de2d314f577c5aa573722    141842    RUNNING
368fb09b4b9a65251179fec90274ca81cf76673283c46aef73fa2b9ce74f2510    142118    RUNNING
0afb12de38d45f0f8e03594f1158a80f5928da3c52d423357c4209997d67e0b9    141807    RUNNING
1f1ba56a4808cbd05c0f06a4f14a34ef27f39a2e5cbb4e0101911686908de61d    141991    RUNNING
6af20e392355c2f0bd87d96c9f6dfa703cd8bbdb27dbf59bd3a2d963dbd9c5ae    143557    RUNNING
1e691ddb33b8812ae746e8554b1762bb3b52c247026f0eb15310510c8ce7e083    143641    RUNNING
12f4fd075298343e6c8e77caf47c2d36658cf2da02754269fc2250a7502c1f03    143672    RUNNING
d2e59bc8c827ae168669194324b901925267822999e5d64e9fcfcf64f2fd99ed    143508    RUNNING
b675f8032f31d6c5be35e98ce19c28527817d7c9f05cf7aba554d879f7628694    141990    RUNNING
78aa82b621abdb886616b47b24c82973db404f279f5f65fb0edda2f1abd62fb4    143594    RUNNING
dbe515f07196c27624aa19dc60585a5972de9d9380c1c65717e55e60cfc7d8d2    142114    RUNNING

# 停止所有 task，即向容器发送 SIGTERM 信号
$ ctr -n k8s.io task ls -q | xargs -n 1 ctr -n k8s.io task kill

# 对于 kill 不掉的进程，可以试试发送 SIGKILL 信号
$ ctr -n k8s.io task ls -q | xargs -n 1 ctr -n k8s.io task kill --signal SIGKILL

# 彻底删除容器
$ ctr -n k8s.io c ls -q | xargs -n 1 ctr -n k8s.io c rm
```

## ctr shell 自动补全

见 https://github.com/containerd/containerd/tree/main/contrib/autocomplete
