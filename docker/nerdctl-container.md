---
title: nerdctl 容器
created: 2021-12-10T18:51:48+0800
updated: 2021-12-10T18:51:48+0800
---


## stateDir

`stateDir=<dataStore>/containers/<NS>/<ID>`

按默认配置，stateDir 即 `/var/lib/nerdctl/1935db59/containers`。


```sh
$ tree /var/lib/nerdctl/1935db59/containers/default/
/var/lib/nerdctl/1935db59/containers/default/
└── 3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5
    ├── 3c41e9ff441d6282bed1d170c3d4abde79e563a17c658b23f75501662cff5bf5-json.log
    ├── hostname
    ├── oci-hook.createRuntime.log
    ├── oci-hook.postStop.log
    └── resolv.conf
```
