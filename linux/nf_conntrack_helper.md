---
title: nf_conntrack_helper
created: 2025-10-21T21:47:04+0800
updated: 2025-10-21T21:56:04+0800
---

## modprobe: FATAL: Module nf_conntrack_helper not found in directory

当执行 `sudo modprobe nf_conntrack_helper` 遇到报错 `modprobe: FATAL: Module nf_conntrack_helper not found in directory`.

或者执行 `sudo sysctl -w net.netfilter.nf_conntrack_helper=1` 报错 `sysctl: cannot stat /proc/sys/net/netfilter/nf_conntrack_helper: No such file or directory`

如果你的 linux 内核版本是 6.0 以上，那么不要尝试配置 nf_conntrack_helper，这是错误的用法。
如果你的 linux 内核版本是 6.0 以下，那么需要检查内核编译参数 CONFIG_NF_CONNTRACK、CONFIG_NF_CONNTRACK_MARK、CONFIG_NF_CONNTRACK_EVENTS、CONFIG_NF_NAT 是否启用。

### 原因

从 linux kernel 4.7 起，net.netfilter.nf_conntrack_helper 的默认值就是 0。

在 kernel 5.19 中，尚存在 nf_conntrack_helper 参数。 https://www.kernel.org/doc/html/v5.19/networking/nf_conntrack-sysctl.html

自 kernel 6.0 起，nf_conntrack_helper 参数就不存在了。 https://www.kernel.org/doc/html/v6.0/networking/nf_conntrack-sysctl.html

因此对于 kernel 6，如果 /etc/sysctl.conf 有设置 net.netfilter.nf_conntrack_helper=1，则要移除这行。否则 `sudo sysctl -p` 会报错。
