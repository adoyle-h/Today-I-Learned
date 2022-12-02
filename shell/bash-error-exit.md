## bash error exit

`set -o errexit` 这个选项对于 `$()` 这种子进程调用方式是无效的。

### 例如

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

=1=
./fail:行12: foo: 未找到命令
=2=0
=3=before throw_error
after throw_error


### 使用 errtrace 和 trap

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

=1=
./fail:行12: foo: 未找到命令
trap!
Shell 已返回1
