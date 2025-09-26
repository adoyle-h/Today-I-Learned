---
title: Vagrant DNS
created: 2020-05-18T00:48:40+0800
updated: 2020-05-18T00:48:40+0800
---


### nslookup 花费 5 秒左右

解决方案：使用宿主机的 DNS。

原因分析：待研究。有可能跟这个问题相关（大概率不是）。

- https://tencentcloudcontainerteam.github.io/2018/10/26/DNS-5-seconds-delay/
- https://www.weave.works/blog/racy-conntrack-and-dns-lookup-timeouts

### 使用宿主机的 DNS

把 `--natdnshostresolver1` 开启。

```
config.vm.provider "virtualbox" do |vb|
  vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
end
```

### 修改 /etc/resolv.conf 无用

Vagrant 虚拟机中，/etc/resolv.conf 默认 dns 服务是 `nameserver 10.0.2.3`。
修改了 /etc/resolv.conf，并不会起到作用，甚至 10.0.2.3 都用不了。
这是因为 Vagrant 有 DNS proxy。
https://github.com/hashicorp/vagrant/blob/v2.2.7/plugins/providers/virtualbox/action/sane_defaults.rb#L68-L85

可以在 Vagrantfile 里设置 `enable_dns_proxy=false`，实际这个选项做了这些事，https://github.com/hashicorp/vagrant/blob/v2.2.7/plugins/providers/virtualbox/action/sane_defaults.rb#L25-L32
