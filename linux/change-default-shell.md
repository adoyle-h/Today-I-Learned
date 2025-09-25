---
title: 更改默认 shell
---


比如 Mac 默认用的是 bash 3，当用 `brew install bash` 安装 bash 5 后，它不是覆盖原来 bash 3 所在路径 `/bin/bash`，而是放在了 `/usr/local/bin/bash`。

你需要改两处，

1. terminal 的 login shell，即登录交互的 shell。
2. 非 login shell。

## login shell

对于 unix 系统用户，需要用 chsh 命令改变 login shell 用哪个。比如执行 `chsh -s /usr/local/bin/bash`。
`chsh` 会选择记录在 `/etc/shells` 中的路径，如果没有它会报错。所以如果有自己安装的新 shell，首先要修改 `/etc/shells` 文件。

对于 Mac 用户，其实是使用 Terminal 进入 shell。很多 Terminal（比如 iTerm2）提供修改 login shell 的选项。`chsh` 对 Mac 用户也就不是必要的了。

## 非 login shell

非 login shell 我指的是非交互的 shell。这通常是 shebang 来识别的，比如一个 shell 脚本第一行是 `#!/usr/bin/env bash`，它会自动判断用哪个 shell。

`/usr/bin/env` 按照 `PATH` 环境变量的路径查找对应的程序。
所以你只要修改 `PATH` 环境变量即可，把你的 shell 所在路径加到 `PATH` 最前面。
