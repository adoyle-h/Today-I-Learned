# Makefile
<!-- editorconfig-checker-disable-file -->

## 命令回显

默认情况下会把每个执行命令（包括注释）都回显到终端。可以在开头加一个 `@` 来阻止回显。
比如 `# echo 123` 改成 `@# echo 123`。


## $PWD 为何出错？

在 Makefile 里写 `docker run -v "$PWD:/site"` 为何会出错？
因为 Makefile 里的变量必须用 `${var}` 或者 `$(var)` 来写。
改成 `docker run -v "${PWD}:/site"` 即可。

## [make config](../linux/kconfig.md)

## $shell 变量为何是空？

```make
.PHONY: a
a:
	v=1
	echo "$$v"
```

`make a` 会打印 `echo "$v"`。

```make
.PHONY: a
a:
	v=1
	echo "$v"
```

`make a` 会打印 `echo ""`。

这是因为 makefile 执行的 shell 命令，每行命令都是运行在独立的 shell 的。

解决方法：写成一行。

```make
.PHONY: a
a:
	v=1; echo "$v"
```

## 在 target 内部使用条件判断

if 和 endif 不要有缩进。

```make
target:
ifeq ($(VERSION),)
	@echo 1
else
  @echo 2
endif
```

## 在 target 内部赋值变量

使用 `$(eval)` 函数。

```make
target:
	$(eval VERSION ?= $(shell git describe --tags --abbrev=0 2>/dev/null))

ifeq ($(VERSION),)
	$(eval VERSION := v0.0.0)
endif

	@echo "${VERSION}"
```

参考 https://stackoverflow.com/questions/1909188/define-make-variable-at-rule-execution-time
