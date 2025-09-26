---
title: virsh shutdown 命令无效
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 问题描述

`virsh shutdown <domain>` 后虚拟机依然是 runnning 状态。

`virsh shutdown` 默认发的是 acpi 命令到虚拟机。
虚拟机需要监听 ACPI 事件通知。如果没有监听，并做对应的处理，就不会有反应。

## 解决方案

```sh
# 安装 acpid 服务
apt install acpid

# 确认服务已启动
systemctl status acpid

# 配置事件 handler
cat <<EOF > /etc/acpi/events/powerbtn
event=button/power.*
action=/etc/acpi/power.sh "%e"
EOF

cat <<'EOF' > /etc/acpi/power.sh
KEY=$(echo "$1" | awk '{printf $2}')

case "$KEY" in
  PBTN)
    /sbin/shutdown -h -P now "Power button pressed"
    ;;
  *)
    logger "ACPI action undefined: $KEY | $*"
    ;;
esac
EOF

# 注意，action 对应的脚本必须是可执行的，否则不会执行。
chmod +x /etc/acpi/power.sh

# 设置开机自启动
systemctl enable acpid
# 重启服务
systemctl restart acpid

# 检查服务是否已加载规则
journalctl -u acpid
# Nov 13 23:01:38 NAS systemd[1]: Started ACPI event daemon.
# Nov 13 23:01:38 NAS acpid[881]: starting up with netlink and the input layer
# Nov 13 23:01:38 NAS acpid[881]: 1 rule loaded
# Nov 13 23:01:38 NAS acpid[881]: waiting for events: event logging is off
```

`virsh shutdown` 和 `virsh reboot` 都会产生相同的 `%e`，内容如下

```
button/power PBTN 00000080 00000000
button/power LNXPWRBN:00 00000080 0000000b
```

实际上 `virsh reboot` 是可以正常重启的。没弄明白原理，可能是 `virsh reboot` 监听到 vm 已关机后就 `virsh start` 了。

## 参考

- https://linux.die.net/man/8/acpid
- https://wiki.archlinux.org/title/Acpid_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)
- [Why doesn't 'shutdown' seem to work?](https://archive.ph/lqIap#Why_doesn.27t_.27shutdown.27_seem_to_work.3F)
