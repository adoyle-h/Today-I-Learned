# systemd-network

## 网络启动流程

https://systemd.io/NETWORK_ONLINE/ ([链接备份](https://web.archive.org/web/20230425211003/https://systemd.io/NETWORK_ONLINE/))

## 常用命令

- 查看网络: networkctl list

## systemd-networkd-wait-online: Timeout occurred while waiting for network connectivity

systemd-networkd-wait-online 会等待所有网络链接可用才会正常退出，否则会等到超时。

`sudo systemctl edit --full systemd-networkd-wait-online.service` 将 `ExecStart=/usr/lib/systemd/systemd-networkd-wait-online` 改为 `ExecStart=/usr/lib/systemd/systemd-networkd-wait-online --any`。

加上 `--any` 参数，只要有一个可用就退出。

`/usr/lib/systemd/systemd-networkd-wait-online --help` 可查看命令详情。
