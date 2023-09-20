# 网络风暴 (Network Storm)

网络风暴是指在计算机网络中由于某些原因导致的网络通信过载。以下是几种常见的网络风暴类型：

1. **广播风暴（Broadcast Storm）**：当网络中的设备发送大量广播消息时，这些消息会占用大量网络带宽，并可能导致其他设备处理这些广播消息时出现性能问题。

2. **多播风暴（Multicast Storm）**：当网络中的设备发送大量多播消息时，这些消息同样会占用大量的网络带宽，并可能导致其他设备处理这些多播消息时出现性能问题。

3. **单播风暴（Unicast Storm）**：当网络中的一台设备向另一台设备发送大量的单播消息时，这些消息会占用大量的网络带宽，并可能对接收设备造成压力。

4. **ARP风暴（ARP Storm）**：当网络中的设备发送大量ARP（地址解析协议）请求时，这也会占用大量的网络带宽，并可能扰乱正常的网络通信。

5. **ICMP风暴（ICMP Storm）**：当网络中的设备发送大量的ICMP（互联网控制消息协议）消息时，这将会吸引大量的网络带宽，并可能导致网络拥塞。

以上就是几种常见的网络风暴类型，防止或者制止网络风暴的产生是网络管理的重要工作之一。

## 排查方法

使用 tcpdump。
以下假设外部流量经过 eth0 网卡。

- 排查 ARP 风暴  `sudo tcpdump -vpn -i eth0 arp`
- 排查 ICMP 风暴  `sudo tcpdump -vpn -i eth0 icmp`