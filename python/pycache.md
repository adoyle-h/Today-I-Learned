---
title: pycache
---


### __pycache__

### .pyc 文件包含当前项目的路径

发现 pyc 文件里会包含当前项目的路径，并不是每个文件都有这种现象，只有少部分有。比如 etcd3 和 yaml 这两个包里是有的。

找了一下发现是用来做 traceback 的，不影响代码逻辑。
详见 https://stackoverflow.com/questions/11191680/why-do-python-pyc-files-contain-the-absolute-path-of-their-source-code
