---
title: 刷新命令的路径缓存
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


当你刚删掉命令行的文件时，又把同名的命令行装到别了的位置，可能会找不到该命令。

比如，我删了旧的 nvim，又把新的 nvim 装在了 `/snap/bin/nvim`。

```sh
$ nvim
-bash: /usr/bin/nvim: No such file or directory

$ ls /usr/bin/nvim
"/usr/bin/nvim": No such file or directory (os error 2)

# 发现问题，bash 把 nvim 的路径缓存了
$ type nvim
nvim is hashed (/usr/bin/nvim)

# 清空 nvim 的路径缓存
$ hash -d nvim

# 确认修正
$ type nvim
nvim is /snap/bin/nvim
```

P.S. 你也可以用 `hash -r` 清空所有缓存。
