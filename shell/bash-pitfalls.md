# Bash 的坑

## nameref 的命名冲突

nameref 不只是传参和接收参数的变量不能同名。
在同一个函数作用域里的其他变量也不能同名，参考下面的代码。

https://gist.github.com/4b1b09325b64c72844ea9112cad650fc#file-1-bash

## VAR=VALUE command 的异常行为

我原先一直以为 `VAR=VALUE` 是只针对当前行生效的，不会在全局生效。实际上会根据 `command` 不同而产生不同的效果。

比如[这个例子]( https://gist.github.com/adoyle-h/ff0a94256489de643c6dade391c969ba)。

原因参考这两个

- https://unix.stackexchange.com/a/264642
- https://unix.stackexchange.com/a/458901

## 声明 Associative Array 必须要写 declare -A

错误声明

```sh
foo=abc
M1=([foo]=1)
echo "${M1[foo]}" # print 1
echo "${M1[abc]}" # print 1

fo=ab
M2=(['fo']=2)
echo "${M2[fo]}" # print 2
echo "${M2[ab]}" # print 2

f=a
M3[f]=3
echo "${M3[f]}" # print 3
echo "${M3[a]}" # print 3
```

正确声明

```sh
foo=abc
declare -A M1=([foo]=1)
echo "${M1[foo]}" # print 1
echo "${M1[abc]}" # print empty

fo=ab
declare -A M2=(['fo']=2)
echo "${M2[fo]}" # print 2
echo "${M2[ab]}" # print empty

f=a
declare -A M3[f]=3
echo "${M3[f]}" # print 3
echo "${M3[a]}" # print empty
```

## shift 的重要性

文件 a.sh

```sh
echo "$@"
```

文件 b.sh

```sh
#!/usr/bin/env bash

source ./a.sh

function load() {
  local path=$1
  source "$path"
}

load ./a.sh
```

执行

```
chmod +x ./b.sh
./b.sh hello
# 输出
# hello
# ./a.sh
```

**坑**：当前脚本以及函数的参数 `$@` 会 `source` 传递给下一个脚本的 `$@`。

bash 5 实测，`source` 改成 `.` 也是一样的结果。

@TODO: bash 4 待测

详见 https://stackoverflow.com/a/65912397

## 数组没法 export

bash 5 实测，这 bug 还是存在。

```sh
export arr=( 1 2 3)
echo "${arr[@]}"
bash -c 'echo "${arr[@]}"'  # It prints empty
```

- https://stackoverflow.com/questions/5564418/exporting-an-array-in-bash-script
- https://www.mail-archive.com/bug-bash@gnu.org/msg01774.html


## 数组赋值在管道执行完毕后会重置

```sh
printf 'a.c\nb.z\nc.z\n' | while read -r path; do
  COMPREPLY+=( "$path" )
done
echo "${COMPREPLY[@]}"
```

打印出来是空的。因为默认情况下所有管道内的命令都是运行在子进程里的。
即 `while read` 和 `COMPREPLY+=( "$path" )` 都运行在子进程，所以父进程的 `COMPREPLY` 值并没有改变。

**解决方法**

改写成这样

```sh
while read -r path; do
  COMPREPLY+=( "$path" )
done < <(printf 'a.c\nb.z\nc.z\n')
echo "${COMPREPLY[@]}"
```


或者使用 `shopt -s lastpipe` 开启 lastpipe，可以让管道中最后一个命令运行在当前 shell 环境。（这个方法可能没用）

相关链接 https://stackoverflow.com/questions/36340599/how-does-shopt-s-lastpipe-affect-bash-script-behavior

## set -o errexit -o pipefail 对于条件判断以及输入重定向无效

举个例子

```bash
#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail -o errtrace
(shopt -p inherit_errexit &>/dev/null) && shopt -s inherit_errexit

fail() {
  return 1
}

foo() {
  # 这里输出重定向到 &2 是为了在 Case 5 可以看到结果
  echo 1 >&2
  fail
  echo 2 >&2
}

# echo "Case 1:"
# foo

# echo "Case 2:"
# foo || true

# echo "Case 3:"
# while read -r var; do
#   foo || true
# done < <(printf -- 'a\nb\n')

# echo "Case 4:"
# if foo; then
#   echo 3
# fi

# echo "Case 5:"
# if [[ $(foo) == 'abc' ]]; then
#   echo 3
# fi
```

取消对应的注释，查看输出。

```
Case 1:
1
```

```
Case 2:
1
2
```


```
Case 3:
1
2
1
2
```

```
Case 4:
1
2
3
```

```
Case 5:
1
2
```

在 Case 2、3、4 中，fail 报错了，但程序依然运行下去。
即使使用 `trap` 也无法捕获 ERR。

这个 BUG (Feature?) 可能会导致严重的问题。在 https://mywiki.wooledge.org/BashPitfalls#errexit 有提到一个例子：

```sh
# WRONG
cleanup() {
  cd "$1"
  rm -f ./*
}

cleanup /no/longer/there || {
  printf >&2 'Cleanup failed\n'
  exit 1
}
```

当 cd 要切换的目录不存在会报错，但是由于上层调用用了 `||` 导致 `rm -f ./*` 会继续执行。
正确的处理方式是这么写：

```sh
# Right
cleanup() {
  cd "$1" || return
  rm -f ./*
}
```

但是这只能解决这一种情况。当 `func-a || func-b` 这种格式下，func-a 内所有执行的函数都有可能报错，那要给每个执行都加上 `|| return` 吗？这显然不合理。

`func-a || func-b` 这种格式其实会经常用到，`func-b` 是一个容错处理函数。但是 bash 的语法机制又会导致这种错误。目前似乎无解！
