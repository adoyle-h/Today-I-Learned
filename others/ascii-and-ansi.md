---
title: ASCII 与 ANSI
---


## ASCII 与 ANSI Code

|          | ANSI Code            | ASCII                         |
|----------|----------------------|-------------------------------|
| 管理组织 | 美国国家标准协会     | 美国信息交换标准代码          |
| 字符集   | 256                  | 128                           |
| Bit      | 8-bit                | 7-bit                         |
| 一致性   | 根据系统上下文有区别 | 每个系统都用同一套 ASCII 码点 |
| 标准化   | No                   | Yes                           |

- ANSI 编码 (ANSI Code)
  - ANSI 编码是由美国国家标准协会 ((ANSI: American National Standards Institute) 制定的标准化的数字或字母标识符。
  - 美国国家标准协会是负责制定美国国家标准的非营利组织。
  - ANSI 编码是 ASCII 的超集。包含了 ASCII 字符，使用 8 位二进制，扩展到 256 个字符。
  - ANSI 编码在 1991 年被 Unicode 代替了。
- ASCII
  - 这套编码共有 128 个字符，由 7 位二进制进行编号。
  - 其中 0~31 号，加上最后的 127 号 Delete 字符是 33 个不被显示的控制字符。其余 95 个字符正好与标准键盘符合。

参考文章

- [Difference between ANSI and ASCII](https://www.tutorialspoint.com/difference-between-ansi-and-ascii) ([链接备份](https://web.archive.org/web/20230226201600/https://www.tutorialspoint.com/difference-between-ansi-and-ascii))

## ANSI 转义序列

虽然 ANSI 编码已成历史，但是 ANSI 转义序列保留至今。现在绝大多数终端都依然支持转义序列。

ANSI 转义序列 (ANSI Escape Sequences) 是一种带内信号 ([In-band signaling][]) 的转义序列标准，用于控制视频文本终端上的光标位置、颜色和其他选项。

控制序列 (Control Sequence)

- ESC - sequence starting with ESC (\x1B)
- CSI - Control Sequence Introducer: sequence starting with ESC [ or CSI (\x9B)
- DCS - Device Control String: sequence starting with ESC P or DCS (\x90)
- OSC - Operating System Command: sequence starting with ESC ] or OSC (\x9D)

- Ctrl-Key 字符 `^[`。

## ASCII Escape 字符

Escape (ESC) 字符的表示方法有很多：

- 十六进制的 `0x1b` 或 `0x1B`。
- 八进制的 `\033` 表示。
- Unicode 字符 `\u001b`。
- 十进制 `27`。
- 固定字符 `\e`

注意这些字符表示法并不是所有程序或设备都支持，需要看情况使用。


[In-band signaling]: https://www.wikiwand.com/en/In-band_signaling
