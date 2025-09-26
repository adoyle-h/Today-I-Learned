---
title: ELF 文件
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


ELF (Executable and Linkable Format)

## 组成

一个 ELF 文件由以下三部分组成：

- ELF 头 (ELF header) - 描述文件的主要特性：类型，CPU架构，入口地址，现有部分的大小和偏移等等；
- 程序头表 (Program header table) - 列举了所有有效的段 (segments) 和他们的属性。程序头表需要加载器将文件中的节加载到虚拟内存段中；
- 节头表 (Section header table) - 包含对节 (sections) 的描述。

参考 https://xinqiu.gitbooks.io/linux-inside-zh/content/Theory/linux-theory-2.html

详见 https://man7.org/linux/man-pages/man5/elf.5.html
