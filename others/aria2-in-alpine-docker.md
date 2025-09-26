---
title: 在 Alpine docker 容器里启动 aria2
created: 2023-12-01T01:27:55+0800
updated: 2023-12-01T01:27:55+0800
---


基于 alpine 镜像安装 aria2。`apk add aria2 aria2-daemon`。

```sh
# 查看包的文件列表
> apk info -L aria2
aria2-1.36.0-r2 contains:
usr/bin/aria2c

> apk info -L aria2-daemon
aria2-daemon-1.36.0-r2 contains:
etc/aria2.conf
etc/conf.d/aria2
etc/init.d/aria2
etc/logrotate.d/aria2
```

aria2-daemon 包含的是 openrc 的 service 配置文件和 aria2 的配置文件。
你需要 `apk add openrc` 来安装 openrc 来管理服务。然后执行 `openrc` 来初始化 openrc 的文件。
如果没有初始化，用 rc-service 启动服务只会提示 `WARNING: aria2 is already starting`，但并没有运行中的服务进程。

然后还要 `touch /run/openrc/softlevel`，否则启动服务会报错：

```
 * You are attempting to run an openrc service on a
 * system which openrc did not boot.
 * You may be inside a chroot or you may have used
 * another initialization system to boot this system.
 * In this situation, you will get unpredictable results!
 * If you really want to do this, issue the following command:
 * touch /run/openrc/softlevel
 * ERROR: aria2 failed to start
```

`rc-update add aria2 default`

然后通过 `rc-service aria2 start` 来启动 aria2。

## 如果遇到 set hostname 错误

我用 docker-compose 和 nerdctl 在遇到了这样的错。

```sh
> rc-service aria2 start
 * Setting hostname ...hostname: sethostname: Operation not permitted
 [ !! ]
 * ERROR: hostname failed to start
 * Setting hostname ...hostname: sethostname: Operation not permitted
 [ !! ]
 * ERROR: hostname failed to start
 * ERROR: cannot start networking as hostname would not start
 * ERROR: cannot start aria2 as hostname would not start
```

这是因为 /etc/init.d/aria2 里定义了依赖 net、dns、netmount。

```sh
depend() {
  need net
  use dns netmount
}
```

而 net 模块又依赖了 hostname 模块，具体看 [openrc - need net](../linux/openrc.md#need-net)。
但是容器没有改变 hostname 的权限。有两种解决方法：

1. `docker run --cap-add SYS_ADMIN`。给容器开放权限。具体权限查看 [Runtime privilege and Linux capabilities](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)。
2. `sed -i'' '/depend() {/,/}/d' /etc/init.d/aria2` 把 depend 函数删了。反正在容器里这些依赖也没有用。删了之后还要重新执行 `openrc` 来生成依赖树 `/run/openrc/deptree`，否则依赖关系还是存在的。
