---
title: bash error exit
created: 2022-12-02T22:53:19+0800
updated: 2022-12-02T22:53:19+0800
---


以下几种情况都会导致 `set -o errexit` 失效。

1. 在子进程中，errexit 选项会被重置。而创建子进程的方法有：`$()`
2. 对于 test 使用场景，errexit 会失效。
3. 在 `while` 或 `until` 中
4. 在 if 条件中
5. 在 `&&` 或 `||` 或 `|` 之前

## 例如

```sh
#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail
[[ -n "${TRACE+x}" ]] && set -o xtrace


throw_error() {
  echo "before throw_error"
  foo
  echo "after throw_error"
}

main() {
  echo "=1="
  msg=$(throw_error)
  echo "=2=$?"
  echo "=3=$msg"
}

main "$@"
```

输出结果:

```
=1=
./fail:行12: foo: 未找到命令
=2=0
=3=before throw_error
after throw_error
```

## 使用 errtrace 和 trap

只能使用 `set -o errtrace` 并且 `trap ERR`，在自己的错误处理函数中及时 exit 1 才能有效中断后续执行。

```sh
#!/usr/bin/env bash
set -o errexit
set -o errtrace
set -o nounset
set -o pipefail
[[ -n "${TRACE+x}" ]] && set -o xtrace


throw_error() {
  echo "before throw_error"
  foo
  echo "after throw_error"
}

trap_error() {
  echo "trap! $*"
  exit 1
}

main() {
  trap trap_error ERR
  echo "=1="
  msg=$(throw_error)
  echo "=2=$?"
  echo "=3=$msg"
}

main "$@"
```

输出结果:

```
=1=
./fail:行12: foo: 未找到命令
trap!
Shell 已返回1
```
