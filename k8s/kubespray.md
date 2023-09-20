## Kubespray

https://github.com/kubernetes-sigs/kubespray

### TOC

<!-- MarkdownTOC GFM -->

- [链接](#链接)
- [Kubespray with Vagrant](#kubespray-with-vagrant)
    - [变量](#变量)
    - [失败重试](#失败重试)
    - [Vagrant 单节点部署](#vagrant-单节点部署)
- [Ansible 打印格式](#ansible-打印格式)
- [与之前版本不同的变动](#与之前版本不同的变动)
    - [移除了 hyperkube 镜像](#移除了-hyperkube-镜像)
    - [移除了 dockerproject_ 变量](#移除了-dockerproject_-变量)
- [准备镜像与文件](#准备镜像与文件)
    - [系统 RPM 包](#系统-rpm-包)
    - [Docker RPM](#docker-rpm)
    - [Docker 镜像](#docker-镜像)
- [在离线环境部署](#在离线环境部署)
- [部署结果](#部署结果)
    - [K8S 组件](#k8s-组件)
    - [镜像](#镜像)
- [nodelocaldns](#nodelocaldns)

<!-- /MarkdownTOC -->


### 链接

- [Ansible 变量](https://github.com/kubernetes-sigs/kubespray/blob/master/docs/vars.md)
- [Ansible Group Vars](https://github.com/kubernetes-sigs/kubespray/blob/master/docs/ansible.md#group-vars-and-overriding-variables-precedence)
- [Ansible Tags](https://github.com/kubernetes-sigs/kubespray/blob/master/docs/ansible.md#ansible-tags)
- [下载二进制文件和镜像](https://github.com/kubernetes-sigs/kubespray/blob/master/docs/downloads.md)

### Kubespray with Vagrant

因为用了 Vagrant 的 Ansible Provision，它会自动生成 ansible inventory 目录，路径是 `<Vagrantfile 所在目录>/.vagrant/provisioners/ansible/inventory`。
且根据 `ansible.host_vars` 和 `ansible.groups` 配置生成 vagrant_ansible_inventory 文件。

详见 https://www.vagrantup.com/docs/provisioning/ansible_intro.html#auto-generated-inventory


因此 Kubespray 的 Vagrantfile 做了一点处理，生成一个软连接，把 `.vagrant/provisioners/ansible/inventory` 指向到 `kubespray/inventory/test_local/`，以此来复用 kubespray 里的 inventory。（这里的 `test_local` 是我的 inventory 目录）

```ruby
# if $inventory is not set, try to use example
$inventory = "inventory/sample" if ! $inventory
$inventory = File.absolute_path($inventory, File.dirname(__FILE__))

# if $inventory has a hosts.ini file use it, otherwise copy over
# vars etc to where vagrant expects dynamic inventory to be
if ! File.exist?(File.join(File.dirname($inventory), "hosts.ini"))
  $vagrant_ansible = File.join(File.dirname(__FILE__), ".vagrant", "provisioners", "ansible")
  FileUtils.mkdir_p($vagrant_ansible) if ! File.exist?($vagrant_ansible)
  if ! File.exist?(File.join($vagrant_ansible,"inventory"))
    FileUtils.ln_s($inventory, File.join($vagrant_ansible,"inventory"))
  end
end
```

```
.vagrant
├── machines/
│   ├── node-1/
│   │   └── virtualbox/
│   ├── node-2/
│   │   └── virtualbox/
│   └── node-3/
│       └── virtualbox/
├── provisioners/
│   └── ansible/
│       └── inventory -> /Users/adoyle/Workspace/kubespray/inventory/test_local/
└── rgloader/
    └── loader.rb
```

你也可以在 Vagrantfile 里设置 `ansible.inventory_path` 来修改 ansible 使用的 inventory 路径。

#### 变量

在 Vagrantfile 里有用 ansible provision 设置 host_vars。生成在 `vagrant_ansible_inventory` 文件里。

#### 失败重试

`ansible-playbook -vvv -i .vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory cluster.yml`

详见 https://github.com/kubernetes-sigs/kubespray/blob/master/docs/vagrant.md#example-use-of-vagrant

#### Vagrant 单节点部署

vagrant/config.rb 设置如下，

```ruby
$num_instances = 1
$etcd_instances = $num_instances
$kube_master_instances = $num_instances == 1 ? $num_instances : ($num_instances - 1)
$kube_node_instances = $num_instances
```

### Ansible 打印格式

修改 `ansible.cfg` 的 `stdout_callback` 参数，

`ansible-doc -t callback -l` 查看可用的插件。

`nocows=1` 禁止 cowsay。
参考 [Callback Plugins](https://docs.ansible.com/ansible/latest/plugins/callback.html)。

### 与之前版本不同的变动

#### 移除了 hyperkube 镜像

因为新版本 kubeadm 不依赖 hyperkube 镜像。

https://github.com/kubernetes-sigs/kubespray/pull/5378

#### 移除了 dockerproject_ 变量

例如 `dockerproject_rh_repo_base_url` 和 `dockerproject_rh_repo_gpgkey`。

https://github.com/kubernetes-sigs/kubespray/pull/5662

### 准备镜像与文件

#### 系统 RPM 包

```
"common_required_pkgs": [
    "openssl",
    "curl",
    "rsync",
    "socat",
    "unzip",
    "e2fsprogs",
    "xfsprogs",
    "ipvsadm",
    "ipset"
]

roles/kubernetes/preinstall/defaults/main.yml

"required_pkgs": [
    "libselinux-python",
    "device-mapper-libs",
    "ebtables",
    "nss",
]

roles/kubernetes/preinstall/vars/centos.yml


common_required_pkgs + required_pkgs: [
    "libselinux-python",
    "device-mapper-libs",
    "ebtables",
    "nss",
    "openssl",
    "curl",
    "rsync",
    "socat",
    "unzip",
    "e2fsprogs",
    "xfsprogs",
    "ipvsadm",
    "ipset"
],
```

libselinux-python, ebtables, rsync 是 centos 系统已经安装的。

#### Docker RPM

#### Docker 镜像

Vagrant 设置 `download_cache_dir`，`vagrant up` 后 docker 文件和部分二进制文件会在这里。例如，

```
├── cni-plugins-linux-amd64-v0.8.1.tgz*
├── images/
│   ├── docker.io_calico_kube-controllers_v3.7.3.tar*
│   ├── docker.io_coredns_coredns_1.6.0.tar*
│   ├── docker.io_lachlanevenson_k8s-helm_v3.1.0.tar*
│   ├── docker.io_library_nginx_1.17.tar*
│   ├── docker.io_nfvpe_multus_v3.2.1.tar*
│   ├── docker.io_rancher_local-path-provisioner_v0.0.2.tar*
│   ├── gcr.azk8s.cn_google-containers_addon-resizer_1.8.3.tar*
│   ├── gcr.azk8s.cn_google-containers_cluster-proportional-autoscaler-amd64_1.6.0.tar*
│   ├── gcr.azk8s.cn_google-containers_k8s-dns-node-cache_1.15.8.tar*
│   ├── gcr.azk8s.cn_google-containers_kube-apiserver_v1.16.7.tar*
│   ├── gcr.azk8s.cn_google-containers_kube-controller-manager_v1.16.7.tar*
│   ├── gcr.azk8s.cn_google-containers_kube-proxy_v1.16.7.tar*
│   ├── gcr.azk8s.cn_google-containers_kube-scheduler_v1.16.7.tar*
│   ├── gcr.azk8s.cn_google-containers_pause_3.1.tar*
│   ├── gcr.azk8s.cn_google_containers_kubernetes-dashboard-amd64_v1.10.1.tar*
│   ├── gcr.azk8s.cn_google_containers_metrics-server-amd64_v0.3.3.tar*
│   ├── gcr.azk8s.cn_google_containers_pause-amd64_3.1.tar*
│   ├── quay.azk8s.cn_coreos_etcd_v3.3.10.tar*
│   ├── quay.azk8s.cn_coreos_flannel-cni_v0.3.0.tar*
│   ├── quay.azk8s.cn_coreos_flannel_v0.11.0.tar*
│   └── quay.azk8s.cn_external_storage_local-volume-provisioner_v2.3.2.tar*
├── kubeadm-v1.16.7-amd64*
├── kubectl-v1.16.7-amd64*
└── kubelet-v1.16.7-amd64*
```

### 在离线环境部署

查看 `ip route` 会发现默认路由经过 `eth0`，这导致虚拟机可以访问宿主机，从而访问外网。

可以删掉虚拟机的默认路由使它变成离线环境。

```ruby
config.vm.provision "shell",
  run: "always",
  inline: "eval `ip route | awk '{ if ($1 == \"default\" && $3 != \"0.0.0.0\" && $5 == \"eth0\") print \"ip route del default via \" $3; }'`"
```

参考 https://www.vagrantup.com/docs/networking/public_network.html#default-router

### 部署结果

#### K8S 组件

```
$ kubectl get all --all-namespaces

NAMESPACE     NAME                                        READY   STATUS    RESTARTS   AGE
kube-system   pod/coredns-58687784f9-btlsk                1/1     Running   2          8d
kube-system   pod/coredns-58687784f9-qbqhs                1/1     Running   2          8d
kube-system   pod/dns-autoscaler-cc54f9686-df5gj          1/1     Running   2          8d
kube-system   pod/kube-apiserver-wh-1                     1/1     Running   2          8d
kube-system   pod/kube-apiserver-wh-2                     1/1     Running   2          8d
kube-system   pod/kube-controller-manager-wh-1            1/1     Running   6          8d
kube-system   pod/kube-controller-manager-wh-2            1/1     Running   4          8d
kube-system   pod/kube-flannel-22kkr                      2/2     Running   6          8d
kube-system   pod/kube-flannel-82fgg                      2/2     Running   5          8d
kube-system   pod/kube-flannel-9vgtv                      2/2     Running   6          8d
kube-system   pod/kube-proxy-585mv                        1/1     Running   2          8d
kube-system   pod/kube-proxy-grmbz                        1/1     Running   2          8d
kube-system   pod/kube-proxy-qd4zd                        1/1     Running   2          8d
kube-system   pod/kube-scheduler-wh-1                     1/1     Running   4          8d
kube-system   pod/kube-scheduler-wh-2                     1/1     Running   4          8d
kube-system   pod/kubernetes-dashboard-5d7898548b-9b7kc   1/1     Running   3          8d
kube-system   pod/local-volume-provisioner-ghl26          1/1     Running   2          8d
kube-system   pod/local-volume-provisioner-m8lz8          1/1     Running   2          8d
kube-system   pod/local-volume-provisioner-qvj7k          1/1     Running   2          8d
kube-system   pod/metrics-server-86df4cdc78-9nk4p         1/2     Running   4          8d
kube-system   pod/nginx-proxy-wh-3                        1/1     Running   2          8d
kube-system   pod/nodelocaldns-kfk7f                      1/1     Running   2          8d
kube-system   pod/nodelocaldns-m2t8t                      1/1     Running   2          8d
kube-system   pod/nodelocaldns-nh257                      1/1     Running   2          8d

NAMESPACE     NAME                           TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
default       service/kubernetes             ClusterIP      10.233.0.1      <none>        443/TCP                      8d
kube-system   service/coredns                ClusterIP      10.233.0.3      <none>        53/UDP,53/TCP,9153/TCP       8d
kube-system   service/kubernetes-dashboard   ClusterIP      10.233.21.62    <none>        443/TCP                      8d
kube-system   service/metrics-server         ClusterIP      10.233.31.243   <none>        443/TCP                      8d

NAMESPACE     NAME                                      DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR                 AGE
kube-system   daemonset.apps/kube-flannel               3         3         3       3            3           beta.kubernetes.io/os=linux   8d
kube-system   daemonset.apps/kube-proxy                 3         3         3       3            3           beta.kubernetes.io/os=linux   8d
kube-system   daemonset.apps/local-volume-provisioner   3         3         3       3            3           <none>                        8d
kube-system   daemonset.apps/nodelocaldns               3         3         3       3            3           <none>                        8d


NAMESPACE     NAME                                   READY   UP-TO-DATE   AVAILABLE   AGE
kube-system   deployment.apps/coredns                2/2     2            2           8d
kube-system   deployment.apps/dns-autoscaler         1/1     1            1           8d
kube-system   deployment.apps/kubernetes-dashboard   1/1     1            1           8d
kube-system   deployment.apps/metrics-server         0/1     1            0           8d

NAMESPACE     NAME                                              DESIRED   CURRENT   READY   AGE
kube-system   replicaset.apps/coredns-58687784f9                2         2         2       8d
kube-system   replicaset.apps/dns-autoscaler-cc54f9686          1         1         1       8d
kube-system   replicaset.apps/kubernetes-dashboard-5d7898548b   1         1         1       8d
kube-system   replicaset.apps/metrics-server-86df4cdc78         1         1         0       8d
```

#### 镜像

```
$ docker images
REPOSITORY                                                             TAG                 IMAGE ID            CREATED             SIZE
nginx                                                                  1.17                6678c7c2e56c        2 weeks ago         127MB
lachlanevenson/k8s-helm                                                v3.1.0              cd51d7c5714d        4 weeks ago         44.6MB
gcr.azk8s.cn/google-containers/kube-apiserver                          v1.16.7             509ac761d1bc        5 weeks ago         159MB
gcr.azk8s.cn/google-containers/kube-controller-manager                 v1.16.7             fddd3276905b        5 weeks ago         151MB
gcr.azk8s.cn/google-containers/kube-proxy                              v1.16.7             eb78c1ef2923        5 weeks ago         82.7MB
gcr.azk8s.cn/google-containers/kube-scheduler                          v1.16.7             e5bdfe04f8b5        5 weeks ago         83.5MB
gcr.azk8s.cn/google-containers/k8s-dns-node-cache                      1.15.8              a1efff7492c8        4 months ago        93.1MB
coredns/coredns                                                        1.6.0               680bc53e5985        7 months ago        42.2MB
calico/kube-controllers                                                v3.7.3              283860d96794        9 months ago        46.8MB
gcr.azk8s.cn/google_containers/metrics-server-amd64                    v0.3.3              c6b5d3e48b43        10 months ago       39.9MB
gcr.azk8s.cn/google-containers/cluster-proportional-autoscaler-amd64   1.6.0               dfe4432cd2e2        10 months ago       47.7MB
quay.azk8s.cn/external_storage/local-volume-provisioner                v2.3.2              c3e26d3f1640        10 months ago       111MB
nfvpe/multus                                                           v3.2.1              4aed35b3b768        12 months ago       500MB
quay.azk8s.cn/coreos/flannel                                           v0.11.0             ff281650a721        13 months ago       52.6MB
gcr.azk8s.cn/google_containers/kubernetes-dashboard-amd64              v1.10.1             f9aed6605b81        15 months ago       122MB
rancher/local-path-provisioner                                         v0.0.2              b621dadd3581        17 months ago       327MB
quay.azk8s.cn/coreos/etcd                                              v3.3.10             643c21638c1c        17 months ago       39.5MB
gcr.azk8s.cn/google-containers/addon-resizer                           1.8.3               b57c00a12f6c        20 months ago       33.1MB
gcr.azk8s.cn/google-containers/pause                                   3.1                 da86e6ba6ca1        2 years ago         742kB
gcr.azk8s.cn/google_containers/pause-amd64                             3.1                 da86e6ba6ca1        2 years ago         742kB
quay.azk8s.cn/coreos/flannel-cni                                       v0.3.0              221392217215        2 years ago         49.8MB
```

### nodelocaldns

kubespray 默认给 nodelocaldns 设置的 ip 是 `169.254.25.10`。这可能有坑。
因为 `169.254.0.0/16` 一般是设备从 DHCP 分配 IP 失败或者没有 DHCP 服务器时，就会随机在这个 B 类地址段获取一个地址。
详见 [169.254.0.0/16](../network/private-ip.md#1692540016)。
