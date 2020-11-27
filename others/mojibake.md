## 乱码问题

### 基本概念

- 字符集合 (Character set): 是各种文字和符号的总称，包括各国家文字、标点符号、图形符号、数字等，简单理解就是一个字库，与计算机以及编码无关。
- 编码字符集 (CCS: Coded Character Set): 是一组字符对应的编码（即数字），为字符集合中的每一个字符给予一个数字，如 Unicode 为每一个字符分配一个唯一的码点与之一一对应。
- 字符编码表 (CEF: Character Encoding Form)，也称为"storage format"，是将编码字符集的非负整数值（即抽象的码位）转换成有限比特长度的整型值（称为码元code units）的序列。
- 字符编码方案 (CES: Character Encoding Scheme)，也称作"serialization format"。将定长的整型值（即码元）映射到8位字节序列，以便编码后的数据的文件存储或网络传输。
- 字符集 (Charset ): 包括编码字符集和字符编码，如 ASCII 字符集、ISO-8859-X、GB2312 字符集（简中）、BIG5 字符集（繁中）、GB18030 字符集、Shift-JIS 等，即下文中提到的字符集。


术语字符编码（character encoding），字符映射（character map），字符集（character set）或者代码页，在历史上往往是同义概念，即字符表（repertoire）中的字符如何编码为码元的流（stream of code units）–通常每个字符对应单个码元。
码元（Code Unit，也称“代码单元”）是指一个已编码的文本中具有最短的比特组合的单元。对于UTF-8来说，码元是8比特长；对于UTF-16来说，码元是16比特长；对于UTF-32来说，码元是32比特长[1]。码值（Code Value）是过时的用法。

### Cheatsheet

GB18030 > GBK > GB2313 （包含关系）
