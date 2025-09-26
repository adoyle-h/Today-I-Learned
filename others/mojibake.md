---
title: 乱码问题
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 基本概念

- 字符集 (Charset: Character Set)：是一种让计算机知道如何识别 Character 的编码系统，这些字符包括字母、数字、标点符号和空白字符。早期，由于各国使用的语言不同而发展出各自的字符集，例如日语的 Kanji JIS(例如 Shift-JIS, EUC-JP 等)，繁体中文的 Big5 和俄罗斯的 KOI8-R。
- 码点 (Code Point) 或 码位 (Code Position) ：是组成码空间（或代码页）的数值。例如，ASCII 码包含 128 个码位，范围是 `0x00` 到 `0x7F`，而 Unicode 包含 1,114,112 个码位，范围是 `0x00` 到 `0x10FFFF`。
- 码元 (Code Unit)：指已编码的文本中具有最短的比特组合的单元。它是码点编码后的数字。例如，在 UTF-8 中，码点是 `0000–007F`，对应码元 `0bbbbbbb (7 bits)`。
- 编码字符集 (CCS: Coded Character Set): 是将字符集C中每个字符映射到1个坐标（整数值对：x, y）或者表示为1个非负整数N。字符集及码位映射称为编码字符集。例如，在一个给定的字符表中，表示大写拉丁字母“A”的字符被赋予整数65、字符“B”是66，如此继续下去。多个编码字符集可以表示同样的字符表，例如ISO-8859-1和IBM的代码页037和代码页500含蓋同样的字符表但是将字符映射为不同的整数。由此产生了编码空间（encoding space）的概念：简单说就是包含所有字符的表的维度。
- 通用字符集 (UCS: Universal Character Set) 是由 ISO 制定的 ISO 10646（或称 ISO/IEC 10646）标准所定义的标准字符集。
- 字符编码表 (CEF: Character Encoding Form)：也称为"storage format"，是将编码字符集的非负整数值（即抽象的码位）转换成有限比特长度的整型值（即码元）的序列。
- 字符编码方案 (CES: Character Encoding Scheme)：也称作"serialization format"。将定长的整型值（即码元）映射到8位字节序列，以便编码后的数据的文件存储或网络传输。
- 字符编码 (Character Encoding)：是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8位元组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。
- 字符映射 (Character Map)：在 Unicode 中保持了其传统意义：从字符序列到编码后的字节序列的映射，包括了上述的 CCS, CEF, CES 层次。
- 字形 (Glyph)：又称字符、字图、书形，是指字的形体。
- 字位 (Grapheme)：计算一个文字系统的规模时，是以字位这个最小单位来计算的，而不是以字位变体。如：英文字母表当中虽然印有52个大小写变体，但是仍然说英文字母有26个，即26个字位。
- 字符表 (Repertoire) 或 抽象字符表 (Abstract Character Repertoire): 是一个系统支持的所有抽象字符的集合。
- 乱码 (Mojibake)：Unicode 因其对通用语言的支持，逐渐成为最被接受的字符集。如果一个字符集使用不正确（例如，对于以 Big5 编码的文章使用 Unicode），你可能会看到全是乱码。

术语字符编码，字符映射，字符集或者代码页，在历史上往往是同义概念，即字符表中的字符如何编码为码元的流。通常每个字符对应单个码元。

详见 [W3C - Character encodings: Essential concepts](https://www.w3.org/International/articles/definitions-characters/)。

## 中文字符集

GB18030 > GBK > GB2313 （包含关系）

## 参考

- [UNICODE CHARACTER ENCODING MODEL](https://www.unicode.org/reports/tr17/)
