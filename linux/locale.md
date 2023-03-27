# 修改 Linux 系统语言 (locale)

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
