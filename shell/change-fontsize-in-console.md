# 修改 console 环境的字体大小

在装机时，既没有 ssh，也没有 xrandr。我们操作的控制台 (console) 似乎无法修改字体大小。
其实只要系统安装了 [kbd](https://github.com/legionus/kbd)，就可以改变字体以及其大小。它提供 `setfont` 命令以及许多控制台字体文件 (consolefont)。

使用 `setfont <consolefont-name>` 命令。比如 `setfont sun12x22`。我建议字体大小至少使用 22 的。

## consolefont

consolefont 是 bitmap font。字体文件全部存放在 consolefonts 目录下，但这个目录路径在不同系统中是不一样的。
比如 Arch Linux 就是 [`/usr/share/kbd/consolefonts/`](https://wiki.archlinux.org/title/Linux_console#Fonts)；
而在 Debian 就是 `/usr/share/consolefonts`，字体文件由 [console-data 包](https://packages.debian.org/bullseye/all/console-data/filelist)提供。

[terminus-font](https://terminus-font.sourceforge.net/shots.html) 包提供了更多好用的控制台字体，也都存放 consolefonts 目录。
terminus-font 字体都以 `ter-` 开头，比如 `ter-v32n`，32 代表字体大小，v 代表包含所有字符集，其他字母含义见下表。

```
names   mappings              covered codepage(s)

ter-1*  iso01, iso15, cp1252  ISO8859-1, ISO8859-15, Windows-1252
ter-2*  iso02, cp1250         ISO8859-2, Windows-1250
ter-7*  iso07, cp1253         ISO8859-7, Windows-1253
ter-9*  iso09, cp1254         ISO8859-9, Windows-1254
ter-c*  cp1251, iso05         Windows-1251, ISO8859-5
ter-d*  iso13, cp1257         ISO8859-13, Windows-1257
ter-g*  iso16                 ISO8859-16
ter-i*  cp437                 IBM-437
ter-k*  koi8r                 KOI8-R
ter-m*  mik                   Bulgarian-MIK
ter-p*  pt154                 Paratype-PT154
ter-u*  koi8u                 KOI8-U
ter-v*  all listed above      all listed above and many others (about 110 and many others language sets), 8 foreground colors
```

```
names   style

ter-*n  normal
ter-*b  bold
ter-*f  framebuffer-bold
```

上面的列表出自[链接](https://files.ax86.net/terminus-ttf/README.Terminus.txt) ([链接备份](https://web.archive.org/web/20230330210110/https://files.ax86.net/terminus-ttf/README.Terminus.txt))。

这里还有一份各个 [consolefont 的预览图](https://adeverteuil.github.io/linux-console-fonts-screenshots/)（[源码](https://github.com/adeverteuil/linux-console-fonts-screenshots)）。是用 `showconsolefonts` 输出的各个字体内容。

## 持久化修改字体

使用 setfont 只能修改当前环境的字体，重启过后就失效了。

编辑 [`/etc/vconsole.conf`](https://man.archlinux.org/man/vconsole.conf.5)。增加 `FONT=sun12x22`。可使之持久化。

## 其他方法

还有一种方式是在 grub 启动参数里加 gfxpayload 参数。但这个方法我试了一下没成功。

网上说还有一种方法是加 `vga=ask` 参数，但是这个参数不起作用的，详见 [grub 文档](https://www.gnu.org/software/grub/manual/grub/grub.html#linux)。

## 参考

- [修改 GRUB 文本模式的分辨率](https://www.aneasystone.com/archives/2015/08/grub-text-mode-resolution.html) ([链接备份](https://web.archive.org/web/20220818051330/https://www.aneasystone.com/archives/2015/08/grub-text-mode-resolution.html))
