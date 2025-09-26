---
title: ansible 部署到 centos7 时，不能找到 service
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


我的远端机器是基于 centos 7 的系统，我的 task 是这样的，

```
- name: start app
  service: name=app state=started enabled=yes
```

结果发现报这个错 `FAILED! => {"changed": false, "failed": true, "msg": "Could not find the requested service \"'app'\": "}`

查看 /etc/init.d/ 里的文件权限没有问题，ssh 到远端机器上也能直接执行 `sudo service app start`，
也尝试用 `become_user` 来更改用户，但还是不行。

最终找到这个 issue：https://github.com/ansible/ansible-modules-core/issues/915

解决方法在这：

> In this case, on CentOS7, ansible is detecting that the system uses systemd, and invokes the systemd module instead. You can add use: service to your invocation, to ensure it uses the service module.

- https://github.com/ansible/ansible/issues/25440#issuecomment-306858849

```
- name: start app
  service: name=app state=started enabled=yes use=service
```

改成这样既可。
