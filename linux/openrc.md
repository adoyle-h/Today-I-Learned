---
tags: [init]
---
# OpenRC

https://github.com/OpenRC/openrc

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
