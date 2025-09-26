---
title: 编辑二进制文件
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


```sh
vim -b <file>
# In vim ex mode

# binary => hex
:%!xxd

# hex => binary
:%!xxd -r
```
## xxd 命令

make a hexdump or do the reverse.

## man ascii

用来查看 ascii 码
