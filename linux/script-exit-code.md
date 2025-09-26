---
title: 程序的退出码 (Exit Code)
created: 2020-10-18T23:08:55+0800
updated: 2020-10-18T23:08:55+0800
---


退出码的有效范围是 0~255。0 代表正常，其他都是异常。

如果程序内设置的退出码超过 255，比如 `exit 3809` 则退出码是 225，因为会取模计算 `3809 % 256 = 225`。
如果程序内设置的退出码返回负数，比如 `exit -1`，则退出码是 255。

退出码的取值有特别含义，

- `1` - Catchall for general errors
- `2` - Misuse of shell builtins (according to Bash documentation)
- `126` - Command invoked cannot execute
- `127` - command not found
- `128` - Invalid argument to exit
- `128+n` - Fatal error signal “n”
- `130` - Script terminated by Control-C
- `255` - Exit status out of range

## 参考

- https://tldp.org/LDP/abs/html/exitcodes.html
- http://www.gnu.org/savannah-checkouts/gnu/libc/manual/html_node/Exit-Status.html
