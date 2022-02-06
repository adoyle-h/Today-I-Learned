## 快速删除文件

```sh
# 随便建一个空目录
mkdir /abc
# 删除目录 target
rsync -a --delete /abc target/
```
