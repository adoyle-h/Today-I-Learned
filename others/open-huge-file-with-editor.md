---
title: 如何打开超大文件
---


比如几十 G 大小的日志文件，用 VIM 打开会很耗时，且占用很大的内存。如果在有内存限制的环境，会导致无法打开文件。

解决方案的关键是切割文件，然后再打开。

- 按行数切割文件 `split -l 100000 app.log app.log_`
- 按大小切割文件 `split -b 1000m app.log app.log_`
- 查看文件的前几行 `head -n 1000 app.log | vim -`
- 查看文件的后几行 `tail -n 1000 app.log | vim -`
- 查看文件的指定行 `sed -n '10,100p' app.log | vim -`
- 过滤文件 `grep 'ERROR' app.log | vim -`
