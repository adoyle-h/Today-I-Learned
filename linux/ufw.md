# UFW

UFW (Uncomplicated Firewall) 是 iptables 和 nftables 的前端。

## 相关文件

- /etc/default/ufw: high level configuration, such as default policies, IPv6 support and kernel modules to use
- /etc/ufw/before[6].rules: rules in these files are evaluated before any rules added via the ufw command
- /etc/ufw/after[6].rules: rules in these files are evaluated after any rules added via the ufw command
- /etc/ufw/sysctl.conf: kernel network tunables
- /var/lib/ufw/user[6].rules or /lib/ufw/user[6].rules (0.28 and later): rules added via the ufw command (should not normally be edited by hand)
- /etc/ufw/ufw.conf: sets whether or not ufw is enabled on boot, and in 9.04 (ufw 0.27) and later, sets the LOGLEVEL
- /etc/ufw/before.init: initialization customization script run before ufw is initialized (ufw 0.34 and later)
- /etc/ufw/after.init: initialization customization script run after ufw is initialized (ufw 0.34 and later)
- /var/log/ufw.log: ufw 日志文件。日志文件格式见[这里](https://help.ubuntu.com/community/UFW#Interpreting_Log_Entries)。

## 常用命令

- `ufw status verbose` 显示准确数字而非单词。
- `ufw status numbered` 显示规则序号。用于 `ufw delete`。
- `ufw allow 6000:6007/udp` 允许 6000-6007 端口的 udp 链接。

## 常用设置

```sh
# 默认禁止出入流量
ufw default reject incoming
ufw default reject outgoing
ufw default allow routed
# 默认只开放基本服务的出流量
ufw allow out dns comment dns
ufw allow out ntp comment ntp
# 默认只开放基本服务的入流量
ufw allow port 22 comment ssh
# 其他端口按需开放
ufw allow out to any port 80 comment http
ufw allow out port 443 comment https
ufw allow out to any port 22 comment "git clone+ssh"
# 启动 ufw
ufw enable
```

## ufw deny 与 ufw reject 的区别

子命令 deny 和 reject 都可以阻止网络访问，不同之处就在于：
reject 阻止后会向请求者返回一条消息，说明请求被阻止了；
deny 则直接阻止请求，并不向请求者返回任何消息回应。

## UFW 与 Docker

Docker 的 iptables 规则一般只在 FORWARD 链上，且在 `ufw-before-logging-forward` 之前。因此 `ufw route` 设置的规则，无法约束 Docker。
Docker 提供 `DOCKER-USER` 链用于自定义规则，且 `DOCKER-USER` 通常位于 FORWARD 链最前面。
因此可以设置 `iptables -I DOCKER-USER -j ufw-user-forward` 来复用 `ufw route` 设置的规则。

`DOCKER-USER` 参考 https://docs.docker.com/network/iptables/

## 手动编辑 /etc/ufw/user.rules 的规则在 ufw 重启后就丢失了

是因为每个规则都必须要有一条注释。如果注释格式不对，这条规则就会被 ufw 删除。

参考 https://askubuntu.com/a/1167580/1675926

详见 `/usr/lib/python3/dist-packages/ufw/backend_iptables.py`

只有 `/etc/ufw/user.rules` 有这约束。`/etc/ufw/before.rules` 和 `/etc/ufw/after.rules` 没有这个约束。

## /etc/ufw/before.rules 与 /etc/ufw/after.rules

ufw 只能做简单的 iptables 管理，像 ICMP、CT、log 等功能都必须用 iptables 或者 nftables 的规则来管理。
ufw 兼容 iptables 或者 nftables 的命令语法。写到 /etc/ufw/before.rules 或 /etc/ufw/after.rules 就行。

问题是比如在 /etc/ufw/after.rules 添加了一条 `-I DOCKER-USER -j ufw-user-forward`，每次 `ufw reload` 后，DOCKER-USER 链会重复增加这个规则。似乎没有合适的办法可以保证不会重复。

`/etc/default/ufw` 有一条配置 `MANAGE_BUILTINS=no`，如果设置为 yes，ufw 会接管整个 iptables。这就可以保证不重复添加，因为 `ufw reload` 重启会清空所有的数据。但是这就会导致别的问题。
如果你使用 libvirt 或者 docker。libvirt 和 docker 会往 INPUT/OUTPUT/FORWARD 创建它们的规则，那 ufw 重启就会清空 kvm 和 docker 设置的规则。

所以建议分开管理。ufw 只管 ufw 链的。INPUT/OUTPUT/FORWARD 链的规则用 iptables 或者 nftables 的配置文件去管理。
