## 快速删文件

`rm -rf` 命令感觉很慢。 `rsync` 命令也能用来快速删文件。

```sh
# 建立一个空的文件夹：
mkdir /tmp/test
# 用rsync删除目标目录/home/test中的文件：
rsync --delete-before -a -H --stats /tmp/test/ /home/test/
```
