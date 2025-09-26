---
title: curl 快速失败
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


`curl -f` 有助于快速判断错误。如果不加 `-f` 参数，curl 执行后的 exit code 永远都是 0。这在编写 shell 脚本时可能会引发问题。

比如请求错误的链接地址时，

`curl -Lo docker.bash https://raw.githubusercontent.com/docker/cli/no-master/contrib/completion/bash/docker`

curl 命令执行成功。得到的 docker.bash 的文件内容是 `404: Not Found`。

`curl -fLo docker.bash https://raw.githubusercontent.com/docker/cli/no-master/contrib/completion/bash/docker`

curl 命令执行失败。并且会打印 `curl: (56) The requested URL returned error: 404`，并且 exit code 会是 56。

加上 `-f` 参数，curl 会识别 http response header 的状态码。
