---
title: UTF-8 vs UTF-16
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


### Question

https://www.compart.com/en/unicode/U+4EE5

存储一个汉字，utf-8 需要 3 个字节，utf-16 需要 2 个字节。
那为什么通用标准都用 utf-8 不用 utf-16？

### Answer

事物都是发展出来的，首先看 utf-16 和 utf-8 是哪个时间点提出和形成规范的。
我查到 utf-16 最初版是在 1991 年，正式版是 1996 年。utf-8 是 1992 年。时间很近似。
https://unicode.org/faq/utf_bom.html

[这篇文章](https://www.wikiwand.com/zh/UTF-8) 有幅图显示了谷歌所记录的 2001~2012 年主要编码的使用情況，UTF-8 在 2008 年超過了所有其他数据，2012 年使用率接近 50％。

> 網際網路工程工作小組（IETF）要求所有網際網路協議都必須支持UTF-8編碼。互聯網郵件聯盟（IMC）建議所有電子郵件軟件都支持UTF-8編碼。

> RFC 3629 / STD 63（2003），這份文件制定了UTF-8是標準的網際網路協議元素

utf-8 成为国际标准也是 2003 年的事情。所以时间不是决定 utf 8/16 的原因。

----------------

其实因素是这些，除了存储和读取，还要考虑传输问题。
本来我以为大小端已经可以确认所以不需要考虑顺序。实际上传输 utf-16 文本要考虑字节序，而 utf-8 没有这个问题。
https://blog.csdn.net/wangjun5159/article/details/49178439

除了字节序的问题，还有兼容性的问题，utf-16 和 utf-32 都不兼容 ASCII 编码，而 utf-8 是兼容 ASCII 的。

还有其他问题，有个人列举了 [downsides to UTF-16](http://benlynn.blogspot.com/2011/02/utf-8-good-utf-16-bad_07.html)，文章评论里挺激烈的，不过我没有仔细看。

这里有份很详细的 [Unicode encodings 对比](https://www.wikiwand.com/en/Comparison_of_Unicode_encodings)。

所以国际组织要求用 utf-8 而不是 utf-16 是合理的。

---

另外，有个叫 [UTS][] (A Unicode Technical Standard) 的文档，没什么用，有兴趣可以看看。

[UTS]: https://www.unicode.org/reports/tr6/tr6-4.html
