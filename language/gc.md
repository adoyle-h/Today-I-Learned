## 垃圾回收 Garbage Collection (GC)

### 基本概念

- GC 负责回收堆内存，不负责回收栈内存

### 基本算法

- 垃圾定位算法
  - 引用计数算法 (Reference Counting)
  - 根搜索算法 (GC Roots Tracing)
    - 三色标记法
- 垃圾回收算法
  - 复制算法 (Copying)
  - 标记-清除算法 (Mark-Sweep)
  - 标记-整理算法 (Mark-Compact)
  - 分代回收算法
    - 老年代 (Tenured Generation)
    - 新生代 (Young Generation)
    - 永久代 (Permanet Generation)

### 可能导致的问题

1. CPU 飙升，周期性毛刺
2. 请求延时增大

### 三色标记法

自己查。随便给个[例子](https://zhuanlan.zhihu.com/p/105495961)。

优点是不会引起 STW，并发执行。

缺点是：

1. 无法判断早先被标记为黑色目前是否不可达。
2. 灰色对象断开了白色对象的引用；即灰色对象原来成员变量的引用发生了变化。
3. 黑色对象重新引用了该白色对象；即黑色对象成员变量增加了新的引用。

### 读屏障

### 写屏障

### STW (Stop The World)

STW 会造成延时问题。

### 不同语言的 GC 机制

- [NodeJS](../nodejs/gc.md)
- [Golang](../go/gc.md)
- [Java](../java/gc.md)
