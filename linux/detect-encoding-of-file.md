---
title: 判断文件编码
---


比如文件是用 utf-8 写的，还是 gb2312。

解决方案:

1. 用 file -I 命令看文件字符集是什么
2. [这个文档](https://www.garykessler.net/library/file_sigs.html)列举了很多文件编码的特定标识。可以读文件头里的二进制去分析。

现成的库:

- https://github.com/chardet/chardet
- https://github.com/aadsm/jschardet
