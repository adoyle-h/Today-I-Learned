---
title: 'scp: Connection closed'
created: 2024-09-02T06:41:19+0800
updated: 2024-09-02T06:41:19+0800
---


scp 拷贝文件到本地时，发现仅有一个报错：`scp: Connection closed`，没有其他提示。

用 `scp -vvv` 查看详细日志：

```
debug2: fd 3 setting O_NONBLOCK
debug2: mux_client_hello_exchange: master version 4
debug3: mux_client_forwards: request forwardings: 0 local, 0 remote
debug3: mux_client_request_session: entering
debug3: mux_client_request_alive: entering
debug3: mux_client_request_alive: done pid = 91572
debug3: mux_client_request_session: session request sent
debug1: mux_client_request_session: master session id: 4
debug3: mux_client_read_packet_timeout: read header failed: Broken pipe
debug2: Control master terminated unexpectedly
scp: Connection closed
```

并没有什么有用信息。只知道是网络问题。

在被连接的服务端用 journalctl 查看系统日志，发现这条日志：
`sshd[3698]: subsystem request for sftp by user adoyle failed, subsystem not found`

可以判断是 sftp subsystem 没有启用。

`grep Subsystem /etc/ssh/sshd_config` 查看 `Subsystem sftp /usr/lib/openssh/sftp-server` 这行是否被注释了，或者没有这行。取消注释或者补上这行，然后重启 sshd 就行。
