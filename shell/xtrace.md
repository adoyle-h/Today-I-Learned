---
title: Bash xtrace
tags: [bash, xtrace, bash-tricks]
---


使用 `set -o xtrace` 来跟踪命令，获取更详细的 debug 信息。

自 Bash 4 开始支持 `BASH_XTRACEFD` 变量，它能改变 xtrace 输出指向到哪个文件描述符里，但最好别改动它，因为关闭 BASH_XTRACEFD 会导致文件描述符也关闭。
BASH_XTRACEFD 默认为 2，所以 xtrace 默认输出到标准错误流。

## 让 xtrace 打印更多信息

通过修改 PS4 变量，比如下面这行会打印当前文件名:行号:当前函数。

`PS4='+[${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]:+${FUNCNAME[0]}}()]: '`

参考自 http://wiki.bash-hackers.org/scripting/debuggingtips#making_xtrace_more_useful

## 不打印 set +o xtrace

```sh
set -x
echo 123
set +x
```

会打印出 `set +x` 这行。改成下面这样就不会打印了。

```sh
set -x
echo 123
{ set +x; } 2>/dev/null
```

参考 https://stackoverflow.com/a/19226038/4622308
