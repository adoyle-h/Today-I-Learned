---
title: Mac 删除允许在后台运行的设置
created: 2023-09-20T15:22:00+0800
updated: 2023-09-20T15:22:00+0800
---


在这两个目录里删除对应的文件

- /Library/LaunchDaemons/
- /Library/LaunchAgents/

有些特权软件安装在 /Library/PrivilegedHelperTools/ 目录下，自己判断要不要删除。
