---
title: 存储
created: 2021-11-28T01:17:57+0800
updated: 2021-11-28T01:17:57+0800
---


## 概念

![Linux-storage-stack-diagram_v4.10.png](https://www.thomas-krenn.com/de/wikiDE/images/e/e0/Linux-storage-stack-diagram_v4.10.png) ([链接备份](https://web.archive.org/web/20230103013337/https://www.thomas-krenn.com/de/wikiDE/images/e/e0/Linux-storage-stack-diagram_v4.10.png))

根据存储内容分类：

- 块存储
- 文件存储
- 对象存储

根据存储媒介分类：

- 直连存储 (DAS, Direct Attach Storage)
- 共享存储
  - SAN (Storage Area Network)
    - FC-SAN: 通过光纤通道转发 scsi 协议
    - IP-SAN: iSCSI 协议，通过 TCP/IP 转发 scsi 协议
  - NFS
  - FTP
  - SMB
    - CIFS
- 分布式存储 (DFS, Distributed File System)

## 程序服务

- Ceph：支持块存储、文件存储、对象存储
- SAMBA：支持 SMB
- nfsd：支持 NFS
- NAS (Network Attached Storage)：支持 NFS、SMB、FTP
  - OpenMediaVault
  - Unraid
  - FreeNAS
  - Synology NAS
- MinIO: 支持对象存储
