## pfctl

pfctl 是 MacOS, FreeBSD 等系统的流量管理工具。

查看帮助 `man pfctl`, `man pf.conf`

- `pfctl -vnf /etc/pf.conf` 校验 /etc/pf.conf 文件是否有语法错误。
- `sudo pfctl -d` 停止 pf daemon。
- `sudo pfctl -ef /etc/pf.conf` 启动 pf daemon 并加载指定配置。
