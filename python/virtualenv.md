---
title: Python Virtualenv
---


[要不我们还是用回 virtualenv/venv 和 pip 吧](https://zhuanlan.zhihu.com/p/81568689) ([链接备份](https://archive.md/tQXuk))

如果你使用 Python 2，那就只能选择 [virtualenv][]，你需要额外安装它。

[venv][] 是 [virtualenv][] 的子集，从 Python 3.3 起，被集成到 Python 标准库中。意味着 Python 3.2 以下的都用不来 venv。且 venv 有缺点，详见 [virtualenv][] 文档。

- `python -m venv venv` 会创建 venv 目录，默认是把 venv/bin/ 里面的文件都是软链接，指向全局环境的 python。
- `python -m venv --copies venv` 会创建 venv 目录，`--copies` 把全局环境的 python 全都拷贝到 venv 目录里。
- `virtualenv -p ~/.pyenv/versions/3.8.2/bin/python --copies venv` virtualenv 可以用 `-p` 指定拷贝哪个路径下的 python。

## virtualenv 没有打包动态链接库

virtualenv 和 python 3 的 venv 都有这问题。

https://github.com/pypa/virtualenv/issues/1015
https://github.com/pypa/virtualenv/pull/1045

执行 `ldd /usr/local/bin/python` 看 python 依赖哪些动态链接库。

如果目标部署机器上没有对应的动态链接库，首先要把动态链接库拷贝到部署机任意位置（通常是 `/usr/local/lib/`）。然后在 LD_LIBRARY_PATH 加入目录路径即可。例如 `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib`。

## virtualenv 没有打包 /usr/local/lib/python3.5/

`--system-site-packages --copies` 即使加上这两个参数，也没有完全复制。

这里 python3.5 只是个例子，跟 python 具体版本没关系。

```
$ python
Could not find platform independent libraries <prefix>
Could not find platform dependent libraries <exec_prefix>
Consider setting $PYTHONHOME to <prefix>[:<exec_prefix>]
Fatal Python error: Py_Initialize: Unable to get the locale encoding
ImportError: No module named 'encodings'

Current thread 0x00007f4dffee0740 (most recent call first):
Aborted (core dumped)
```

encodings 这种 python 标准库，都在 /usr/local/lib/python3.5 路径下。


## 制作完整的 venv 离线包

两种方式，

1. 从官方 docker 镜像中制作 venv，安装 python 依赖包。
2. 自己编译 python，制作 venv，安装 python 依赖包。这种情况适用于 venv 拷贝到（跟镜像同一基线的）宿主机上。

### 方案 1

```Dockerfile
FROM python:3.8.2-slim

WORKDIR /app

SHELL ["/bin/bash", "-c"]

RUN apt-get update
RUN apt-get install -y build-essential
RUN python -m venv --copies venv
RUN mkdir -p venv/dll && \
    cp /usr/local/lib/{libpython3.8m.so,libpython3.8m.so.1.0,libpython3.so} venv/dll/ && \
    cp -rf /usr/local/lib/python3.8/* venv/lib/python3.8/

ADD requirements.txt .

RUN source ./venv/bin/activate && \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r ./requirements.txt
RUN tar -czf ./venv.tgz -C ./venv .

CMD [ "bash" ]
```

### 方案 2

```Dockerfile
FROM centos:7

WORKDIR /app

SHELL ["/bin/bash", "-c"]

# See https://github.com/pyenv/pyenv/wiki/Common-build-problems
RUN yum install -y @development \
      zlib-devel bzip2 bzip2-devel readline-devel \
      sqlite sqlite-devel openssl-devel xz xz-devel libffi-devel findutils

RUN curl https://pyenv.run | bash
RUN export PATH="/root/.pyenv/bin:$PATH" &&\
    eval "$(pyenv init -)" &&\
    eval "$(pyenv virtualenv-init -)" &&\
    CFLAGS=-I/usr/include/openssl LDFLAGS=-L/usr/lib64 pyenv install -v 3.8.2

RUN export PATH="/root/.pyenv/bin:$PATH" &&\
    eval "$(pyenv init -)" &&\
    eval "$(pyenv virtualenv-init -)" &&\
    pyenv shell 3.8.2 &&\
    python -m venv --copies venv

RUN mkdir -p venv/dll && \
    cp /root/.pyenv/versions/3.8.2/lib/{libpython3.8m.so,libpython3.8m.so.1.0,libpython3.so} venv/dll/ && \
    cp -rf /root/.pyenv/versions/3.8.2/lib/python3.8/* venv/lib/python3.8/

RUN source ./venv/bin/activate && \
    pip install --upgrade pip

ADD requirements.txt .
RUN source ./venv/bin/activate && \
    pip install -r ./requirements.txt

RUN tar -czf ./venv.tgz -C ./venv .

CMD [ "bash" ]
```

### docker cp 导出 venv 包

```sh
main() {
  local image=$1
  local venv_file=$2

  local cid
  cid=$(docker create "$image")
  docker cp "$cid":/app/venv.tgz "$venv_file"
  docker rm "$cid"

  # tar -xzf "$venv_file" -C "$output"
}
```

### 使用包需要重新路径

```python
#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
set -o errtrace
(shopt -p inherit_errexit &>/dev/null) && shopt -s inherit_errexit

if (( $# < 1 )) || [[ ${1:-} == '-h' ]] || [[ ${1:-} == '--help' ]]; then
  cat <<EOF
USAGE: $0 <venv-path> [<replace>=<venv-path>] [<match>=/app/venv]

ARGS:
<venv-path>     Relative or absolute path. Example: './python/venv'.
<replace>       Absolute path. Example: '/opt/xxx/venv'.
<match>         Absolute path. Default to '/app/venv'.
EOF
  exit 0
fi

replace_file() {
  local file
  while read -r file; do
    echo "To modify file: $file"
    sed -i'' "s#$match#$replace#g" "$file"
  done
}

main() {
  local venv_dir
  venv_dir=$(realpath "$1")
  local replace=${2:-${venv_dir}}
  local match=${3:-/app/venv}

  echo "venv_dir: $venv_dir"
  echo "match: $match"
  echo "replace: $replace"

  grep -l -r "$match" "$venv_dir" | grep -v '__pycache__' | grep -v '.pyc' | replace_file
}

main "$@"
```

注意不要把 .pyc 文件修改了，会导致某些包失效。


<!-- links -->

[pyenv]: https://github.com/pyenv/pyenv
[virtualenv]: https://virtualenv.pypa.io/en/latest/
[venv]: https://docs.python.org/3/library/venv.html
