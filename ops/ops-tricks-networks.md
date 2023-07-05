## 运维小技巧 - 网络

### 域名解析

`nslookup` 或 `dig`

### 检测 IP 连通

`ping <host or ip>`

### 查看请求链路的 ICMP 丢包情况

`mtr -r <host or ip>`

如果遇到下面的报错，说明需要加上 `sudo` 执行命令。

```
mtr-packet: Failure to open IPv4 sockets
mtr-packet: Failure to open IPv6 sockets
mtr: Failure to start mtr-packet: Invalid argument
```

### 检测 TCP 端口连通

方案任选其一：

- `nc -vz <ip> <port>`
- `echo "" | telnet <ip> <port>`

有些老系统没有 nc 命令或者 nc 命令不支持 -z 选项。
似乎所有 unix 发行版都有 telnet 命令。

### 检测 UDP 端口连通

`nc -vzu <ip> <port>`

### 检测二层网络连通

最好使用 [linkloop](https://linux.die.net/man/1/linkloop)。

或者，`ip neigh` 查看 ip neighbour 的 mac 地址。如果没有相应记录代表二层网络不通，如果有，**不一定**代表二层网络连通。

### 判断是否存在 ARP 欺骗

`arping -d <ip>`

### 查看 Mac 地址

`arp -a` 查看本机的 ARP Table

### 抓包、嗅探

- tcpdump
- conntrack
- Wireshark
- Chrome DevTools
