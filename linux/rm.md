# rm 命令

## rm ./* 不会删除 . 开头的文件

```sh
mkdir -p tmp
touch ./tmp/.abc
touch ./tmp/hello
rm -f ./tmp/*
ls -a ./tmp
# .    ..   .abc
```
