---
title: DNF
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


DNF，全称 Dandified Yum，是 RPM 发行版的软件包管理器 Yellowdog Updater, Modified (YUM) 的下一代版本。

DNF 兼容 YUM 大部分操作和参数。兼容 /etc/yum.repos.d/ 等文件目录。

于是有 yum adapter 这种工具来写个伪 yum，实际用的是 dnf。

## 注意 --disablerepo --enablerepo 顺序

- dnf repolist --disablerepo=* --enablerepo=repo
- dnf repolist --enablerepo=repo --disablerepo=*

这两个命令结果是不一样的，disablerepo=* 在后，会禁用所有 repo。
