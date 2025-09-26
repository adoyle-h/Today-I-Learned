---
title: 为什么 Unicode U+F8FF 是苹果 Logo？
created: 2021-11-12T17:06:12+0800
updated: 2021-11-12T17:06:12+0800
---


## 问题

为什么 unicode 里面有 apple logo？
https://unicode-table.com/en/F8FF/

## 回答

U+F8FF 是 Unicode 字符集 (Character Set) 里的值，即码位 (Code Point)。Unicode 的字符编码 (Character Encoding) 和其他机制将码位映射到可视化字形 (Glyph) 或者不可视的控制字符。这过程太复杂我还没搞清。

U+F8FF 在 Unicode 的 [Private Use Areas](https://www.wikiwand.com/en/Private_Use_Areas) 范围（U+E000 - U+F8FF）里。并且还是在 Corporate User Area 范围（U+F000 - U+F8FF）里。注意，Corporate User Area 是旧版 Unicode 的说法。在最新的 Unicode 14 里是叫 Compatibility and Specials Area（U+F900 - U+FFFF）。详见 https://www.unicode.org/versions/Unicode14.0.0/ch02.pdf

U+F8FF 显示成什么图案，是跟当前使用使用的字体编码和字体决定的，也就是跟当前展示字符的程序相关。

U+F8FF 在 windows 电脑上是不会显示出苹果 Logo 的。你可以在 windows 打开你那个网页链接看看。这有个[在线的虚拟机](https://live.browserstack.com/dashboard#os=Windows&os_version=10&browser=Chrome&browser_version=93.0&zoom_to_fit=true&full_screen=true&resolution=responsive-mode&speed=1)。

苹果的字符编码主要是 Mac OS Roman。也有派生的 Mac OS Symbol 和 Mac OS Croatian。

在 Unicode 官网有很多文件，比如苹果公司有个 [CORPCHAR.TXT](http://www.unicode.org/Public/MAPPINGS/VENDORS/APPLE/CORPCHAR.TXT) 文件定义了 Mac OS Roman 对 Corporate User Zone 的编码规范。这个 [APPLE UNICODE README](https://www.unicode.org/Public/MAPPINGS/VENDORS/APPLE/ReadMe.txt) 文件更详细地写了所有考量细节。


> Apple Logo was approved as part of Unicode 1.1 in 1993.

说明苹果公司对于字体非常重视，占坑占得早。Compatibility and Specials Area 毕竟坑位有限，如今向 Unicode 组织申请应该会非常难批准。
