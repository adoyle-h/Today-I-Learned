---
title: 堆外内存
created: 2020-09-10T23:28:55+0800
updated: 2020-09-10T23:28:55+0800
---


堆外内存 (off-heap memory) 就是把内存对象分配在语言虚拟机的堆以外的内存。这些内存直接受操作系统管理（而不是语言虚拟机），这样做的结果就是能够在一定程度上减少垃圾回收 (GC) 对应用程序造成的影响。

堆外内存是语言虚拟机里的概念，不是系统内存定义的概念。

堆外内存是为了解决 GC 效率问题。

Java 通过 java.nio.DirectByteBuffer 对象进行堆外内存的管理和使用，它会在对象创建的时候就分配堆外内存。

NodeJS 通过 Buffer 对象进行堆外内存的管理和使用。

参考文章

- [Stackoverflow - Difference between “on-heap” and “off-heap”](https://stackoverflow.com/questions/6091615/difference-between-on-heap-and-off-heap)
- [解读 V8 GC Log（一）: Node.js 应用背景与 GC 基础知识](https://developer.aliyun.com/article/592878) ([链接备份](https://web.archive.org/web/20221205070327/https://developer.aliyun.com/article/592878))
- [解读 V8 GC Log（二）: 堆内外内存的划分与 GC 算法](https://developer.aliyun.com/article/592880) ([链接备份](https://web.archive.org/web/20220702174904/https://developer.aliyun.com/article/592880))
- [Visualizing memory management in V8 Engine](https://deepu.tech/memory-management-in-v8/) ([链接备份](https://web.archive.org/web/20221205035300/https://deepu.tech/memory-management-in-v8/))
- [深入理解堆外内存 Metaspace](https://www.javadoop.com/post/metaspace) ([链接备份](https://web.archive.org/web/20220519200016/https://www.javadoop.com/post/metaspace))
- [V8 的内存管理和垃圾回收](https://juejin.im/post/6854573218708078605) ([链接备份](https://web.archive.org/web/20211021150007/https://juejin.cn/post/6854573218708078605))
- [堆外内存 之 DirectByteBuffer 详解](https://www.jianshu.com/p/007052ee3773) ([链接备份](https://web.archive.org/web/20220625050126/https://www.jianshu.com/p/007052ee3773))
