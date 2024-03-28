# iptables 与 nftables

iptables 基于 [netfilter](./netfilter.md)。主要用于网络防火墙的场景。

## 从内核详解 iptables 原理

- http://www.zsythink.net/archives/1199 : 这个系列写得很棒，图文并茂简单易懂。([链接备份](https://web.archive.org/web/20200813052902/http://www.zsythink.net/archives/1199/))
- [深入理解 iptables 和 netfilter 架构](https://arthurchiao.github.io/blog/deep-dive-into-iptables-and-netfilter-arch-zh/) ([链接备份](https://web.archive.org/web/20221116015223/https://arthurchiao.art/blog/deep-dive-into-iptables-and-netfilter-arch-zh/))

## firewalld

https://firewalld.org/

使用它的系统: RHEL 7, CentOS 7, Fedora 18 and newer

> 从Cent7以后，iptables服务的启动脚本已被忽略。请使用firewalld来取代iptables服务。在RHEL7里，默认是使用firewalld来管理netfilter子系统，不过底层调用的命令仍然是iptables。firewalld是iptables的前端控制器，用于实现持久的网络流量规则。它提供命令行和图形界面。

[firewalld 与 iptables](https://www.jianshu.com/p/70f7efe3a227) ([链接备份](https://web.archive.org/web/20200806020422/https://www.jianshu.com/p/70f7efe3a227))

## nftables

> nftables 是新式的数据包过滤框架，旨在替代现用的 iptables 框架。nftables 诞生于 2008 年，2013 年底合并到 Linux 内核，从 Linux 内核 3.13 版本开始可用。

> nftables 是取代 iptables、ip6tables、arptables 和 ebtables 的新的包过滤框架。nftables 旨在解决现有{ip/ip6}tables 工具存在的诸多限制。相对于旧的 iptables，nftables 最引人注目的功能包括改进性能如支持查询表；事务型规则更新，所有规则自动应用；等等。
> nftables 实现了一组被称为表达式的指令，可通过在寄存器中储存和加载来交换数据。也就是说，nftables 的核心可视为一个虚拟机，nftables 的前端工具 nft 可以利用内核提供的表达式去模拟旧的 iptables 匹配，维持兼容性的同时获得更大的灵活性。

- [网络防火墙之 iptables 的前世今生](http://www.yunweipai.com/16482.html) ([链接备份](https://web.archive.org/web/20211203214109/http://www.yunweipai.com/16482.html))
- [Nftables HOWTO 中文版](https://farkasity.gitbooks.io/nftables-howto-zh/content/)
  - [原版](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page)
- [从实现上对比 iptables 和 nftables](https://blog.csdn.net/dog250/article/details/41526421) ([链接备份](https://web.archive.org/web/20200216024821/https://blog.csdn.net/dog250/article/details/41526421))
- https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks

### nft list ruleset 输出空白

这是因为 nftables 和 iptables 不共享规则数据。如果 `nft list ruleset` 输出了 iptables 里的规则，那是因为你用的 nft 命令其实是 iptables-nft。

详见下面两篇文章

- [Redhat Developers - iptables: The two variants and their relationship with nftables](https://developers.redhat.com/blog/2020/08/18/iptables-the-two-variants-and-their-relationship-with-nftables)([链接备份](https://web.archive.org/web/20240130101206/https://developers.redhat.com/blog/2020/08/18/iptables-the-two-variants-and-their-relationship-with-nftables#the_iptables_rules_appear_in_the_nftables_rule_listing))
- [RED HAT BLOG - Using iptables-nft: a hybrid Linux firewall](https://www.redhat.com/en/blog/using-iptables-nft-hybrid-linux-firewall) ([链接备份](https://web.archive.org/web/20230910012341/https://www.redhat.com/en/blog/using-iptables-nft-hybrid-linux-firewall))



### iptables 版本

`iptables -V` 如果显示 `iptables vX.Y.Z (legacy)`，说明用的是原生的 iptables。
如果是 `iptables vX.Y.Z (nf_tables)`，则用的是 iptables-nft。

也可以从软链接看出，

```sh
ls -al $(which iptables)

/usr/bin/iptables -> xtables-legacy-multi  # legacy iptables
/usr/bin/iptables-nft -> xtables-nft-multi # nft iptables
```

```
+--------------+     +--------------+     +--------------+
|   iptables   |     |   iptables   |     |     nft      |   USER
|    legacy    |     |     nft      |     |  (nftables)  |   SPACE
+--------------+     +--------------+     +--------------+
       |                          |         |
====== | ===== KERNEL API ======= | ======= | =====================
       |                          |         |
+--------------+               +--------------+
|   iptables   |               |   nftables   |              KERNEL
|      API     |               |     API      |              SPACE
+--------------+               +--------------+
             |                    |         |
             |                    |         |
          +--------------+        |         |     +--------------+
          |   xtables    |--------+         +-----|   nftables   |
          |    match     |                        |    match     |
          +--------------+                        +--------------+
```

### iptables-nft

iptables-nft 只是 iptables 过渡到 nftables 的中间产物，让用户用 iptables 的命令行交互操作 nftables api。
然而 iptables-nft 并不完全等价于 nftables。

### 把 iptables 转换成 nftables 规则

```sh
# 先导出 iptables 规则
sudo iptables-save > iptables.dump
sudo ip6tables-save > ip6tables.dump
# 转换成 nftasbles 规则，并写入 nftables 启动配置
iptables-restore-translate -f iptables.dump > /etc/nftables/ruleset-from-iptables.nft
ip6tables-restore-translate -f ip6tables.dump > /etc/nftables/ruleset-from-ip6tables.nft
```

详见 https://wiki.nftables.org/wiki-nftables/index.php/Moving_from_iptables_to_nftables

## UFW

[UFW - Uncomplicated Firewall](https://help.ubuntu.com/community/UFW)

> The default firewall configuration tool for Ubuntu is ufw. Developed to ease iptables firewall configuration, ufw provides a user friendly way to create an IPv4 or IPv6 host-based firewall.

## iptables-save/iptables-restore

- 将 iptables 规则保存到文件: `iptables-save > /etc/iptables/rules.v4`
- 系统加载 iptables 规则: `iptables-restore /etc/iptables/rules.v4`

Linux 系统启动默认不会加载 iptables 规则，需要在 systemd service 里使用 iptables-restore 来加载规则。

```
[Unit]
Description=Packet Filtering Framework

[Service]
ExecStart=/sbin/iptables-restore /etc/iptables/rules.v4
ExecReload=/sbin/iptables-restore /etc/iptables/rules.v4
Type=oneshot
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

## nft -f /etc/nftables.conf

nft 不使用 `iptables-save` 和 `iptables-restore`。

- 将 nftables 规则保存到文件: `nft list ruleset > /etc/nftables.conf`
- 系统加载 nftables 规则: `nft -f /etc/nftables.conf`

Linux 系统启动默认不会加载 /etc/nftables.conf 文件，需要在 systemd service 里使用 `nft -f` 来加载规则。

```
[Unit]
Description=NFT ruleset
After=network.target

[Service]
ExecStart=/usr/sbin/nft -f /etc/nftables.conf
ExecReload=/usr/sbin/nft -f /etc/nftables.conf
Type=oneshot
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

## 其他

iptables 的可读性和执行效率不如 nftables，强烈推荐 nftables。

ip6tables 是 IPv6 版本的 iptables。

MacOS 没有 iptables，使用的是 pfctl。

[Iptables 技巧/指南](https://github.com/trimstray/iptables-essentials)
