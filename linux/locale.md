---
title: 修改 Linux 系统语言 (locale)
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## Debian 系统

执行 `dpkg-reconfigure locales` 选择 `en_US.UTF-8`（英文）或 `zh_CN.UTF-8`（中文）。

编辑文件 `/etc/default/locale`，将其内容更改成

如果你要英文

```
LANG="en_US.UTF-8"
LANGUAGE="en_US:en"
```

如果你要中文

```
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh"
```

## locale-gen

编辑 /etc/locale.gen 文件，取消注释 `en_US.UTF-8 UTF-8`。然后执行 `locale-gen` 命令。
`echo "LANG=en_US.UTF-8" > /etc/locale.conf`
