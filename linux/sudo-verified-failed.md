---
title: 'sudo 密码校验失败'
created: 2025-12-28T22:26:12+0800
updated: 2025-12-30T13:31:12+0800
tags: []
---

## 遇到 sudo 密码失败时做的检查

按顺序做以下检查：

1. `whoami` 查看当前用户是谁。
1. `passwd -S $(whoami)`
  - P = Password set（正常）
  - L = Locked（被锁定）。如果被锁定，`sudo passwd -u $(whoami)` 解锁。
  - NP = No Password
1. `sudo -k && sudo -v`
  - `sudo -k` 清除 sudo 认证缓存
  - `sudo -v` 重新验证
  - `sudo -K` 删除时间戳文件（强制失效）
    - 时间戳文件通常在：`/run/sudo/ts/$UID`
1. `getent passwd $(whoami)`
  - 因为 sudo 验证的密码源不一定是本地文件 /etc/shadow。它还可以用 PAM 连接 LDAP/AD/sssd。
  - 如果返回类似这种 `adoyle:x:1000:1000::/home/adoyle:/bin/bash`，说明密码源是本地文件。
