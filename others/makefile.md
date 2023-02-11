# Makefile

## 命令回显

默认情况下会把每个执行命令（包括注释）都回显到终端。可以在开头加一个 `@` 来阻止回显。
比如 `# echo 123` 改成 `@# echo 123`。


## $PWD 为何出错？

在 Makefile 里写 `docker run -v "$PWD:/site"` 为何会出错？
因为 Makefile 里的变量必须用 `${var}` 或者 `$(var)` 来写。
改成 `docker run -v "${PWD}:/site"` 即可。

## [make config](../linux/kconfig.md)
