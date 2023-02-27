## iptables 与 nftables

iptables 基于 [netfilter](./netfilter.md)。主要用于网络防火墙的场景。

### 从内核详解 iptables 原理

- http://www.zsythink.net/archives/1199 : 这个系列写得很棒，图文并茂简单易懂。([链接备份](https://web.archive.org/web/20200813052902/http://www.zsythink.net/archives/1199/))
- [深入理解 iptables 和 netfilter 架构](https://arthurchiao.github.io/blog/deep-dive-into-iptables-and-netfilter-arch-zh/) ([链接备份](https://web.archive.org/web/20221116015223/https://arthurchiao.art/blog/deep-dive-into-iptables-and-netfilter-arch-zh/))

### firewalld

https://firewalld.org/

使用它的系统: RHEL 7, CentOS 7, Fedora 18 and newer

> 从Cent7以后，iptables服务的启动脚本已被忽略。请使用firewalld来取代iptables服务。在RHEL7里，默认是使用firewalld来管理netfilter子系统，不过底层调用的命令仍然是iptables。firewalld是iptables的前端控制器，用于实现持久的网络流量规则。它提供命令行和图形界面。

[firewalld 与 iptables](https://www.jianshu.com/p/70f7efe3a227) ([链接备份](https://web.archive.org/web/20200806020422/https://www.jianshu.com/p/70f7efe3a227))

### nftables

> nftables 是新式的数据包过滤框架，旨在替代现用的 iptables 框架。nftables 诞生于 2008 年，2013 年底合并到 Linux 内核，从 Linux 内核 3.13 版本开始可用。

> nftables 是取代 iptables、ip6tables、arptables 和 ebtables 的新的包过滤框架。nftables 旨在解决现有{ip/ip6}tables 工具存在的诸多限制。相对于旧的 iptables，nftables 最引人注目的功能包括改进性能如支持查询表；事务型规则更新，所有规则自动应用；等等。
> nftables 实现了一组被称为表达式的指令，可通过在寄存器中储存和加载来交换数据。也就是说，nftables 的核心可视为一个虚拟机，nftables 的前端工具 nft 可以利用内核提供的表达式去模拟旧的 iptables 匹配，维持兼容性的同时获得更大的灵活性。

- [网络防火墙之 iptables 的前世今生](http://www.yunweipai.com/16482.html) ([链接备份](https://web.archive.org/web/20211203214109/http://www.yunweipai.com/16482.html))
- [Nftables HOWTO 中文版](https://farkasity.gitbooks.io/nftables-howto-zh/content/)
  - [原版](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page)
- [从实现上对比 iptables 和 nftables](https://blog.csdn.net/dog250/article/details/41526421) ([链接备份](https://web.archive.org/web/20200216024821/https://blog.csdn.net/dog250/article/details/41526421))
- https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks

### UFW

[UFW - Uncomplicated Firewall](https://help.ubuntu.com/community/UFW)

> The default firewall configuration tool for Ubuntu is ufw. Developed to ease iptables firewall configuration, ufw provides a user friendly way to create an IPv4 or IPv6 host-based firewall.

### 其他

iptables 的可读性和操作效率不如 nftables，强烈推荐 nftables。

ip6tables 是 IPv6 版本的 iptables。

MacOS 没有 iptables，使用的是 pfctl。

[Iptables 技巧/指南](https://github.com/trimstray/iptables-essentials)
