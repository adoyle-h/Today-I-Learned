## 原码, 反码, 补码

对于数学加减法场景，反码的存在意义是计算机可以用加法运算来做数学减法，但是反码不能解决 +0 和 -0 的问题，所以才有了补码。

原理看这三篇文章足以。

- 原码、反码、补码的产生、应用以及优缺点有哪些？
  - [李俊达的回答](https://www.zhihu.com/question/20159860/answer/71256667) ([链接备份](https://archive.md/fkEb3))
  - [张天行的回答](https://www.zhihu.com/question/20159860/answer/119405396) ([链接备份](https://archive.md/VXhQR))
- [张子秋 - 原码, 反码, 补码 详解](https://www.cnblogs.com/zhangziqiu/archive/2011/03/30/ComputerCode.html) ([链接备份](https://web.archive.org/web/20221207235444/https://www.cnblogs.com/zhangziqiu/archive/2011/03/30/ComputerCode.html))


### 反码的应用场景

反码并非完全无用，它的应用场景有据可循的是在加密领域。比如[这篇论文][1] ([链接备份](https://web.archive.org/web/20170810202511/http://www.csjournals.com/IJITKM/PDF%205-1/Article_14.pdf)) 里提到他们有用反码实现加密算法。在某些加密场景下，反码运算要比补码运算更快，所以反码还是有存在意义的。

> One's complement systems are still in use. Some encryption algorithms for fast scalar arithmetic can run much faster in one's complement than in two's. This is mostly used in encapsulated signal processing units or real-time signal analysis systems. Because of that advantage one's complement systems will continue to exist and get used.
> 参考 [Quora 的回答](https://www.quora.com/Why-did-they-use-the-ones-complement-number-system-to-encode-negative-and-positive-numbers-in-a-binary-number-representation/answer/Andreas-Harke)。

[1]: http://www.csjournals.com/IJITKM/PDF%205-1/Article_14.pdf
