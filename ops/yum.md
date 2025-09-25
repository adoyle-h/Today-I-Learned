---
title: YUM
---


yum 的学习使用。

## YUM 资料手册

- http://yum.baseurl.org/
- http://yum.baseurl.org/wiki/Guides.html

## 查看 YUM

`rpm -qa|grep yum` 查看已安装的 yum 信息

## 配置目录

```
/etc/yum
├── fssnap.d
├── pluginconf.d
│   ├── branch.conf
│   ├── fastestmirror.conf
│   └── langpacks.conf
├── protected.d
│   └── systemd.conf
├── vars
├── version-groups.conf
├── yum-cron.conf
└── yum-cron-hourly.conf

/etc/yum.conf

/etc/yum.repos.d
├── alios.repo
├── ops.repo
├── ops.repo.render-5256
├── ops.repo.saveyum.20200224
├── RHEL.repo
├── taobao.repo
├── taobao.repo.render-5258
└── taobao.repo.saveyum.20200224
```

## /etc/yum.conf

http://man7.org/linux/man-pages/man5/yum.conf.5.html

## /etc/yum.repos.d

http://man7.org/linux/man-pages/man5/yum.conf.5.html#[repository]_OPTIONS

### mirrorlist


## /etc/yum/pluginconf.d

- YUM 常用插件
  - [yum-plugin-fastestmirror](https://wiki.centos.org/zh/PackageManagement/Yum/FastestMirror)
  - [yum-plugin-priorities](https://wiki.centos.org/zh/PackageManagement/Yum/Priorities)
  - yum-metadata-parser
  - yum-langpacks
  - [yum-utils](https://linux.die.net/man/1/yum-utils): tools for manipulating repositories and extended package management
    - debuginfo-install - install debuginfo packages and their dependencies
    - package-cleanup - manage package cleanup, duplicates, orphaned packages and outstanding dependency problems
    - repo-graph - outputs a full package dependency list in dot format
    - repo-rss - generates an RSS feed from one or more repositories
    - repoclosure - reads metadata of repositories, checks dependencies and displays list of unresolved dependencies
    - repodiff - takes two or more repositories, returns a list of added, removed or changed packages
    - repomanage - manages a directory of rpm packages, returns a list of newest or oldest packages in a directory
    - repoquery - query yum repositories and get additional information on the them
    - reposync - synchronize a remote yum repository to a local directory using yum to retrieve packages
    - repotrack - track packages and its dependencies and downloads them
    - yum-builddep - installs missing dependencies to build a specified package
    - yum-complete-transaction - finds incomplete or aborted yum transactions and attempts to complete them
    - yum-installed - print a compact package list making use of comps groups
    - yumdownloader - downloads packages from yum repositories including source RPMs
- YUM 其他插件
  - yum-plugin-versionlock

## RPM 仓库

- RpmForge：是 RHEL 系统下的软件仓库，拥有 10000 多个软件包，被认为是最安全、最稳定的一个软件仓库。
  - 清华镜像: https://mirror.tuna.tsinghua.edu.cn/help/repoforge/
- EPEL (Extra Packages for Enterprise Linux)：是由 Fedora Special Interest Group 维护的 Enterprise Linux（RHEL、CentOS）中经 常用到的包。
  - 清华镜像：https://mirror.tuna.tsinghua.edu.cn/help/epel/


## YUM 指定仓库

`yum install --enablerepo=<repo-name> <package-name>`

意思是只用指定仓库来安装包。
`--enablerepo` 还可以使用通配符 `*`。

另外也有 `--disablerepo=` 来排除指定的仓库。

**注意 --disablerepo --enablerepo 顺序**

- yum repolist --disablerepo=* --enablerepo=repo
- yum repolist --enablerepo=repo --disablerepo=*

这两个命令结果是不一样的，disablerepo=* 在后，会禁用所有 repo。

## yum 缓存

`cat /etc/yum.conf  | grep cache` 一般会看到如下结果，
```
cachedir=/var/cache/yum/$basearch/$releasever
keepcache=1
```

`cachedir` 是 rpm 包缓存目录。
`keepcache=1` 的意思是开启 rpm 包缓存。

因此你可以在 `/var/cache/yum/$basearch/$releasever/[repository]/packages` 目录下查看到 rpm 包缓存。

一些指令。

- `yum makecache` 保证缓存是最新的。
- `yum clean all` 清除所有缓存。
- `yum -C <command>` 使用缓存执行命令。

详见文章 [RedHat - WORKING WITH YUM CACHE](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/sec-working_with_yum_cache)。
