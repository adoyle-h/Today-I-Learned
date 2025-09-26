---
title: 关闭 Mac 的 Gatekeeper
created: 2023-02-12T08:36:52+0800
updated: 2023-02-12T08:36:52+0800
---


为了让 Mac 能够安装所有来源的 App，需要临时关闭 Gatekeeper。

```sh
> spctl --status
assessments enabled

> sudo spctl --master-disable

> spctl --status
assessments disabled
```

恢复 Gatekeeper。

```sh
> sudo spctl --master-enable

> spctl --status
assessments enabled
```
