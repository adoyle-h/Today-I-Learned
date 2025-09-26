---
title: CentOS 与 Debian 文件上的差异
created: 2021-11-14T00:09:49+0800
updated: 2021-11-14T00:09:49+0800
---


## /etc/sysconfig

- Debian/Ubuntu: iptables-save > /etc/iptables/rules.v4
- RHEL/CentOS: iptables-save > /etc/sysconfig/iptables

## /etc/systemd/network
