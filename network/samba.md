---
title: Samba
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


Samba 是让 UNIX/Linux 系统与 Windows 系统的资源共享的服务。

Samba 是 SMB (Server Messages Block) 协议的具体实现。SMB 是共享文件和打印机的一种通信协议。

Samba 是 Client/Server 结构。Server 端由 `smbd` (Samba Daemon) 和 `nmbd` 组成。
smbd 主要功能是用来管理 SAMBA 主机分享的目录、档案与打印机等等。监听端口 `139` 和 `445`，都是 TCP 协议。
nmbd 主要功能是用来管理工作组，NetBIOS name 解析。让 Samba 客户端在网络上发现该 Samba 服务。监听端口 `137` 和 `138`，都是 UDP 协议。

NetBIOS (Network Basic Input/Output System)，是网络的基本输入输出系统。它是一种会话层协议，应用于各种 LAN （Ethernet、Token Ring 等）和 WAN 环境，诸如 TCP/IP、PPP 和 X.25 网络。

smbd 和 nmbd 的配置参数都在 [smb.conf](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html) 文件中。
