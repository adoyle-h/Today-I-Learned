---
title: nerdctl 网络
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 创建流程

1. 创建 CNI 配置文件
2. 创建 resolv.conf 文件
3. 创建 hosts 文件
4. 创建 hostname 文件
5. 触发 [oci createRuntime hook](https://github.com/opencontainers/runtime-spec/blob/main/runtime.md)
	- 调用 nerdctl internal oci-hook createRuntime
		1. 创建 hostsstore
		2. 加载 CNI 插件配置。设置 CNI 插件的可执行文件目录
		3. 调用 [cni.New](https://pkg.go.dev/github.com/containerd/go-cni#New) 设置 CNI 配置，遵循 [CNI 配置标准](https://www.cni.dev/docs/spec/#section-1-network-configuration-format)
		4. 调用 [cni.Setup](https://pkg.go.dev/github.com/containerd/go-cni#CNI.Setup)。遵循 [CNI 的执行标准](https://www.cni.dev/docs/spec/#section-3-execution-of-network-configurations)
			1. 直接在 `/proc/<容器 pid>/ns/net` 路径创建 network namespace
			2. 执行 attachNetworks，根据 CNI 配置调用 CNI 插件
				1. [ipam - host-local 插件](https://www.cni.dev/plugins/current/ipam/host-local/) 会分配动态 IP 给容器网络
			3. 把 CNI 插件的返回 JSON 格式重新整理，返回给上层
		5. 调用 hostsstore.Acquire，把新创建的容器网络配置信息（即 cni.Setup 的返回值）写入到 meta.json
		6. 调用 hostsstore 读取 meta.json 的内容配置，更新到 hosts 文件
6. 容器网络创建完成


所以 containerd 不负责容器网络的创建，这都是由 nerdctl 直接控制的。

## CNI 配置

CNI 就两个相关配置，插件可执行文件和插件配置文件。这两类文件的搜索路径在 [containerd config.toml](./containerd.md#config.toml) 中设置。

- CNI 插件可执行文件
  - 目录在 config.toml 中 `[plugins."io.containerd.grpc.v1.cri".cni]` 的 `bin_dir` 路径。通常是 `/etc/cni/net.d`
  - 可执行文件通常是第三方 CNI 项目提供的，下载可执行文件放到这个目录即可。
- CNI 插件配置
  - 目录在 config.toml 中 `[plugins."io.containerd.grpc.v1.cri".cni]` 的 `conf_dir` 路径。通常是 `/usr/lib/cni`
  - 插件的配置文件通常是以 .conflist（或 .conf 或 .json）文件名结尾的文件。

## CNI 插件

调用插件是通过环境变量和配置文件传递给插件，配置内容通过 stdin 输入，插件把 JSON 输出到 stdout 来返回结果。

## resolv.conf

resolv.conf 文件路径是 `<dataStore>/containers/<NS>/<ID>/resolv.conf`。
它的内容由三部分组成：

1. 宿主机的 /etc/resolv.conf
2. slirp4Dns 的配置
3. nerdctl --dns 的配置

举个例子，resolv.conf 的内容：

```sh
$ cat /var/lib/nerdctl/1935db59/containers/default/3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5/resolv.conf
search HAN
nameserver 192.168.1.2
```

这个文件在创建容器时会被 mount --bind 到容器的 /etc/resolv.conf。

## hosts

hosts 文件路径是 `<dataStore>/etchosts/<NS>/<ID>/hosts`。

这个文件在创建容器时会被 mount --bind 到容器的 /etc/hosts。

## hostname

hostname 文件路径是 `<dataStore>/containers/<NS>/<ID>/hostname`。

这个文件在创建容器时会被 mount --bind 到容器的 /etc/hostname。

## meta.json

meta.json 文件路径是 `<dataStore>/etchosts/<NS>/<ID>/meta.json`

NS 是 containerd namespace 的名称。如果调用 containerd 的上游是 Docker 默认为 `moby`，Kubernetes 默认为 `k8s.io`，其他默认为 `default`。

ID 是容器 ID。

`<dataStore>/etchosts/<NS>/<ID>/` 在容器启动前创建，在容器删除后删除，容器 stop 时依然保留。

举个例子，我创建了一个 k3s 容器。其容器 ID 是 `3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5`。

```sh
$  ls /var/lib/nerdctl/1935db59/etchosts/default/
21b5486e0cedfb4560d9873c1d57c368fbee8252b5ca58147d53b37190d9c578  7fdc35f51709ccbe8f5e84a7dbaf56edb8b7ff9f4644b05fa3e7dd873c4dd0c9
39a65e7482273a1f569ac2397dd4af10a651b5e577f96c0b6e230ed43952db10  846347fb07a6306da611c53136ffec09d04035de2752617976b0ed27b3004ac5
3a508a0b1d9f5f793feb0ff4439fd2fca7f5200bb36283fc13ed093365332d23  874b83075c1c2195e4fcff38dcde77d150411e9d667c43ab776175b041b0304a
3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5  927b7fe40db96b7dcfe2955e86922397c407a9956565318ccd527c65d1d2825a
45d2d2d3aba769029bcf55821142a2c0723537436d038b5387305cae2c5116a3  d5b993c9a7e00d182f85f5ba97c331cb6ee99dd75c8f82a7f6b11bbf50ea2018
78ee76c2653b708c3c11c31b91e1fe6ef49268432978f56c5c0f0f257ceb3099

$ ls /var/lib/nerdctl/1935db59/etchosts/default/3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5/
hosts  meta.json

$ cat /var/lib/nerdctl/1935db59/etchosts/default/3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5/hosts

# <nerdctl>
127.0.0.1          localhost localhost.localdomain
:1                 localhost localhost.localdomain
10.4.10.15         server server.k3s_default k3s_server_1 k3s_server_1.k3s_default
# </nerdctl>

$ python3 -m json.tool /var/lib/nerdctl/1935db59/etchosts/default/3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5/meta.json
{
    "Namespace": "default",
    "ID": "3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5",
    "Networks": {
        "k3s_default": {
            "cniVersion": "1.0.0",
            "interfaces": [
                {
                    "name": "nerdctl1",
                    "mac": "86:58:72:24:a2:e4"
                },
                {
                    "name": "veth2c83f02c",
                    "mac": "4a:d1:11:ec:89:a1"
                },
                {
                    "name": "eth0",
                    "mac": "72:d8:24:77:1c:51",
                    "sandbox": "/proc/1065816/ns/net"
                }
            ],
            "ips": [
                {
                    "interface": 2,
                    "address": "10.4.10.15/24",
                    "gateway": "10.4.10.1"
                }
            ],
            "routes": [
                {
                    "dst": "0.0.0.0/0"
                }
            ],
            "dns": {}
        }
    },
    "Hostname": "server",
    "ExtraHosts": {},
    "Name": "k3s_server_1"
}
```

## ipam 插件

- dhcp : Runs a daemon on the host to make DHCP requests on behalf of a container
- host-local : Maintains a local database of allocated IPs
- static : Allocates static IPv4/IPv6 addresses to containers

https://www.cni.dev/plugins/current/ipam/

[host-local](https://www.cni.dev/plugins/current/ipam/host-local/) 插件会把分配的 IP 信息放到 `/var/lib/cni/networks/$NETWORK_NAME` 下，
可以修改 `dataDir` 配置来改变存放路径。
