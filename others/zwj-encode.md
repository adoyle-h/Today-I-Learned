# 零宽字符加密

零宽连字 (ZWJ: Zero Width Joiner)，是一个不打印字符。放在某些需要复杂排版语言（如阿拉伯语、印地语）的两个字符之间，使得这两个本不会发生连字的字符产生了连字效果。零宽连字符的 Unicode 码位是 `U+200D` (`<200d>`)。
Emoji 就使用 ZWJ 来合成表情。

零宽不连字 (ZWNJ: Zero-Width Non-Joiner) 是一个不打印字符，放在电子文本的两个字符之间，抑制本来会发生的连字，而是以这两个字符原本的字形来绘制。Unicode 中的零宽不连字字符映射为 `U+200C` (`<200c>`)。


加密方式

https://yuanfux.github.io/zero-width-web/


## 空格

- [`U+2000`](https://www.compart.com/en/unicode/U+2000) En Quad
- [`U+2001`](https://www.compart.com/en/unicode/U+2001) Em Quad 
- [`U+2002`](https://www.compart.com/en/unicode/U+2002) En Space
- [`U+2003`](https://www.compart.com/en/unicode/U+2003) Em Space
- [`U+2004`](https://www.compart.com/en/unicode/U+2004) Three-Per-Em Space
- [`U+2005`](https://www.compart.com/en/unicode/U+2005) Four-Per-Em Space
- [`U+2006`](https://www.compart.com/en/unicode/U+2006) Six-Per-Em Space
- [`U+2007`](https://www.compart.com/en/unicode/U+2007) Figure Space
- [`U+2008`](https://www.compart.com/en/unicode/U+2008) Punctuation Space
- [`U+2009`](https://www.compart.com/en/unicode/U+2009) Thin Space
- [`U+200A`](https://www.compart.com/en/unicode/U+200A) Hair Space
- [`U+00A0`](https://www.compart.com/en/unicode/U+00A0) No-Break Space (NBSP)

## 不可见字符

- [`U+200B`](https://www.compart.com/en/unicode/U+200B) Zero Width Space (ZWSP)
- [`U+200C`](https://www.compart.com/en/unicode/U+200C) Zero Width Non-Joiner (ZWNJ)
- [`U+200D`](https://www.compart.com/en/unicode/U+200D) Zero Width Joiner (ZWJ)
- [`U+200E`](https://www.compart.com/en/unicode/U+200E) Left-to-Right Mark (LRM)
- [`U+200F`](https://www.compart.com/en/unicode/U+200F) Right-to-Left Mark (RLM)
- [`U+2061`](https://www.compart.com/en/unicode/U+2061) Function Application
- [`U+2062`](https://www.compart.com/en/unicode/U+2062) Invisible Times
- [`U+2063`](https://www.compart.com/en/unicode/U+2063) Invisible Separator
- [`U+2064`](https://www.compart.com/en/unicode/U+2064) Invisible Plus
- [`U+206A`](https://www.compart.com/en/unicode/U+206A) Inhibit Symmetric Swapping
- [`U+206B`](https://www.compart.com/en/unicode/U+206B) Activate Symmetric Swapping
- [`U+206C`](https://www.compart.com/en/unicode/U+206C) Inhibit Arabic Form Shaping
