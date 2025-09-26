---
title: socket
created: 2019-09-24T21:37:50+0800
updated: 2019-09-24T21:37:50+0800
---


## socket 状态

- CLOSED        没有使用这个套接字[netstat 无法显示closed状态]
- LISTEN        套接字正在监听连接[调用listen后]
- SYN_SENT      套接字正在试图主动建立连接[发送SYN后还没有收到ACK]
- SYN_RECEIVED  正在处于连接的初始同步状态[收到对方的SYN，但还没收到自己发过去的SYN的ACK]
- ESTABLISHED   连接已建立
- CLOSE_WAIT    远程套接字已经关闭：正在等待关闭这个套接字[被动关闭的一方收到FIN]
- FIN_WAIT_1    套接字已关闭，正在关闭连接[发送FIN，没有收到ACK也没有收到FIN]
- CLOSING       套接字已关闭，远程套接字正在关闭，暂时挂起关闭确认[在FIN_WAIT_1状态下收到被动方的FIN]
- LAST_ACK      远程套接字已关闭，正在等待本地套接字的关闭确认[被动方在CLOSE_WAIT状态下发送FIN]
- FIN_WAIT_2    套接字已关闭，正在等待远程套接字关闭[在FIN_WAIT_1状态下收到发过去FIN对应的ACK]
- TIME_WAIT     这个套接字已经关闭，正在等待远程套接字的关闭传送[FIN、ACK、FIN、ACK都完毕，这是主动方的最后一个状态，在过了2MSL时间后变为CLOSED状态]

也可以查询 `man netstat` 看到状态解释。
