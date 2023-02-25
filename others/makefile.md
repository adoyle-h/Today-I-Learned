# Makefile
<!-- editorconfig-checker-disable-file -->

## TOC

<!-- MarkdownTOC GFM -->

- [参考资料](#参考资料)
- [命令回显](#命令回显)
- [变量赋值](#变量赋值)
- [target 作用域的变量定义](#target-作用域的变量定义)
- [珍爱生命，远离 ifeq](#珍爱生命远离-ifeq)
    - [ifeq 无法识别 Target-specific Variable Values](#ifeq-无法识别-target-specific-variable-values)
    - [ifeq 无法识别在 target 内部赋值的变量](#ifeq-无法识别在-target-内部赋值的变量)
- [$PWD 为何出错？](#pwd-为何出错)
- [make config](#make-config)
- [$shell 变量为何是空？](#shell-变量为何是空)
- [在 target 内部使用条件判断](#在-target-内部使用条件判断)
- [在 target 内部赋值变量](#在-target-内部赋值变量)
- [注意 &&](#注意-)

<!-- /MarkdownTOC -->

## 参考资料

- https://www.cnblogs.com/peterYong/p/15030385.html
- https://makefiletutorial.com/
- [陈皓 - 跟我一起写Makefile](https://seisman.github.io/how-to-write-makefile/)

## 命令回显

默认情况下会把每个执行命令（包括注释）都回显到终端。可以在开头加一个 `@` 来阻止回显。
比如 `# echo 123` 改成 `@# echo 123`。

## 变量赋值

- 惰性赋值 Lazy Assignment (`=`)
- 立即赋值 Immediate Assignment (`::=` or `::=`)
- 立即并转义 Immediate with Escape (`:::=`)
- 惰性缺省 Lazy Set if Absent (`?=`)
- Appending (`+=`)
- Shell Assignment (`!=`)

## target 作用域的变量定义

```make
target: a := 1
target: b := 2
target:
	@echo ${a}
  @echo ${b}
```

多个变量赋值不能写在一行。

[Target-specific Variable Values](https://www.gnu.org/software/make/manual/html_node/Target_002dspecific.html)

## 珍爱生命，远离 ifeq

**避免在 ifeq 引用局部变量。ifeq 只做简单的判断，无法承担复杂的职责。**

原因：这是因为 `ifeq` 不在 target 内部生效，它是文件级别的，因此不识别任何局部变量。

变通方法：使用 shell 语法，用 `;` 把所有 shell 命令都写成一行。再用 `\` 来换行。
但这会导致写起来非常难看，非常难调试。

### ifeq 无法识别 Target-specific Variable Values

```make
.PHONY: c
c: FILE := CHANGELOG
c:
ifeq ($(FILE),CHANGELOG)
	@echo 1
else
	@echo 2
endif
```

`make c` 会打印 2。

```make
.PHONY: c
FILE := CHANGELOG
c:
ifeq ($(FILE),CHANGELOG)
	@echo 1
else
	@echo 2
endif
```

`make c` 会打印 1。

原因：这是因为 `ifeq` 不在 target 内部生效，它是文件级别的，因此不识别 Target-specific Variable Values。

解决方法：避免在 ifeq 引用局部变量。使用 shell 语法，用 `;` 把所有 shell 命令都写成一行。再用 `\` 来换行。但这会导致写起来非常难看，非常难调试。

### ifeq 无法识别在 target 内部赋值的变量

原因和解决方法同上。

```make
w := true
.PHONY: a
a:
	@echo "w=${w}"

ifeq ($w,true)
	@echo 1
else
	@echo 2
endif
```

`make a` 打印结果：

```
w=true
1
```

```make
.PHONY: a
a:
	$(eval w := true)
	@echo "w=${w}"

ifeq ($w,true)
	@echo 1
else
	@echo 2
endif
```

`make a` 打印结果：

```
w=true
2
```

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

使用 `$(eval)` 函数。`$(eval a := 1)`。

参考 https://stackoverflow.com/questions/1909188/define-make-variable-at-rule-execution-time

**但这种方法存在问题！**，不要使用 `$(eval)` **在 target 内部**赋值变量！你应该使用 shell 语法来操作变量。
原因见[珍爱生命，远离 ifeq](#珍爱生命远离-ifeq)。


## 注意 &&

```make
.PHONY: a
a:
	@[[ -n '' ]] && echo 1
```

`make a` 会报错。因为 `[[ -n '' ]]` 的退出码是非 0 的，于是 `[[ -n '' ]] && echo 1` 整行的退出码也是非 0 的。即报错。

解决方案：

要么这么写

```make
.PHONY: a
a:
	@[[ -n '' ]] && echo 1 || true
```

要么这么写

```make
.PHONY: a
a:
	@if [[ -n '' ]]; then echo 1; fi
```
