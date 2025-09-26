---
title: hashcat
created: 2025-03-26T04:42:09+0800
updated: 2025-03-26T04:42:09+0800
---


## hashcat --help

`hashcat --help` 命令经常卡在 `hashcat (v6.2.6) starting in help mode`，要等很久才会打印出帮助文档。

`Usage: hashcat [options]... hash|hashfile|hccapxfile [dictionary|mask|directory]...`

## 样例

暴力破解: `hashcat -a 3 -m 13000 --session=test --increment --increment-min 5 ./hashfile '?a?a?a?a?a?a?a'`

暴力破解: `hashcat -a 3 -m 13000 --session=test --increment --increment-min 5 --increment-min 8 ./hashfile --custom-charset1=?l?u?d ?1`

字典破解: `hashcat -a 0 -m 13000 --session=test ./hashfile ./dict/` （把多个字典都放在 ./dict 目录下。注意它不能递归查找，比如 ./dict/abc/ 目录下的字典就不会使用）

## hashfile 的格式

如果用 `rar2john` 会得到这样格式的结果：

`./hashfile:$rar5$16$8e7e3940fd955dd9ffb9c0ec5da84f84$15$9a9270cded7h0ab3bd097182724968c2$8$2ad570261d32c110`

但 hashcat 不需要前面的文件路径，你需要修改 hashfile 的内容，改成如下样子：

`$rar5$16$8e7e3940fd955dd9ffb9c0ec5da84f84$15$9a9270cded7h0ab3bd097182724968c2$8$2ad570261d32c110`

hashcat 才能正常识别 hashfile。

## Attack Modes

```
-a 0  # Straight (Dictionary)
-a 1  # Combination
-a 3  # Brute-force
-a 6  # Hybrid Wordlist + Mask
-a 7  # Hybrid Mask + Wordlist
-a 9  # Association
```

## Built-in charsets

```
?l = abcdefghijklmnopqrstuvwxyz
?u = ABCDEFGHIJKLMNOPQRSTUVWXYZ
?d = 0123456789
?h = 0123456789abcdef
?H = 0123456789ABCDEF
?s = «space»!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
?a = ?l?u?d?s
?b = 0x00 - 0xf f
```


## Apple's OpenCL drivers (GPU) are known to be unreliable

```
* Device #2: Apple's OpenCL drivers (GPU) are known to be unreliable.
             You have been warned.
```

通过 homebrew 安装的 hashcat 有问题。

### 解决方法

删除 homebrew 安装的 hashcat 。通过[源码编译](https://github.com/hashcat/hashcat/blob/master/BUILD.md#building-hashcat-for-linux-and-macos)。

1. 执行 `mkdir -p ~/.cache/hashcat/kernels/`
2. 执行 `hashcat -I`

```
hashcat (v6.2.6) starting in backend information mode

Metal Info:
===========

Metal.Version.: 343.21

Backend Device ID #1 (Alias: #2)
  Type...........: GPU
  Vendor.ID......: 2
  Vendor.........: Apple
  Name...........: Apple M3
  Processor(s)...: 10
  Clock..........: N/A
  Memory.Total...: 10922 MB (limited to 4096 MB allocatable in one block)
  Memory.Free....: 5408 MB
  Local.Memory...: 32 KB
  Phys.Location..: built-in
  Feature.Set....: macOS GPU Family 2 v1
  Registry.ID....: 1545
  Max.TX.Rate....: N/A
  GPU.Properties.: headless 0, low-power 0, removable 0

OpenCL Info:
============

OpenCL Platform ID #1
  Vendor..: Apple
  Name....: Apple
  Version.: OpenCL 1.2 (Jun 28 2024 22:57:48)

  Backend Device ID #2 (Alias: #1)
    Type...........: GPU
    Vendor.ID......: 2
    Vendor.........: Apple
    Name...........: Apple M3
    Version........: OpenCL 1.2
    Processor(s)...: 10
    Clock..........: 1000
    Memory.Total...: 10922 MB (limited to 1024 MB allocatable in one block)
    Memory.Free....: 5408 MB
    Local.Memory...: 32 KB
    OpenCL.Version.: OpenCL C 1.2
    Driver.Version.: 1.2 1.0
```

