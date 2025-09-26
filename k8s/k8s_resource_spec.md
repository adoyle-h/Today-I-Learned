---
title: K8S Resource Spec
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## Container env 的 value 必须是字符串

如果是数字，就会报错。
例子，

```yaml
spec_template:
  containers:
    - name: name
      image: image
      env:
        - name: port
          value: "3306"
```

用 envFrom 可以避免这个问题。
