---
title: OpenRC
created: 2023-02-11T15:50:05+0800
updated: 2023-02-11T15:50:05+0800
tags: [init]
---


https://github.com/OpenRC/openrc

## 常用命令

- `rc-service $name start|stop|status|restart`
- `rc-status`: 查看 service 状态

## Service

https://github.com/OpenRC/openrc/blob/master/service-script-guide.md

虽然用的 `#!/sbin/openrc-run`，但 service 脚本用的就是 POSIX shell 语法。

### need net

在 service 定义里经常会看到这么一段。

```
depend() {
  need net
}
```

但是并不存在 /etc/init.d/net 文件。实际上 need net 引用的是 /etc/init.d/networking。
因为在 /etc/init.d/networking 有这么一段。

```
depend() {
  need localmount hostname
  want dev-settle
  after bootmisc hwdrivers modules
  provide net
  keyword -jail -prefix -vserver -docker
}
```

定义了 `provide net`，就可以用 `need net` 引用了。

## creashed service

creashed service 还是 running 状态。rc-service start 没用。rc-service restart。
