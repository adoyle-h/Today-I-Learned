---
title: 色彩空间
---


色彩空间 (Color Space) 是对色彩的组织方式。

定义色彩空间时，通常使用 [CIELAB](./cie-color-space.md#cielab) 或者 [CIEXYZ](./cie-color-space.md#ciexyz) 色彩空间作为参考标准。标准色彩空间便于色彩空间之间进行坐标转换。

## 常见的色彩空间

以下列出常见的色彩模式以及其色彩空间。

- RGB: 适用于数字显示屏设备。
  - [CIEXYZ (CIE 1931 XYZ)](https://www.wikiwand.com/zh-hans/CIE_1931%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4): 由国际照明委员会 (CIE) 制定的标准颜色空间。
  - [CIEUVW (CIE 1964 U*V*W*)](https://www.wikiwand.com/en/CIE_1964_color_space): CIEXYZ
  - [CIELUV](https://www.wikiwand.com/en/CIELUV): CIEUVW 的变体
    - [HSLuv](https://www.hsluv.org/): CIELUV 的变体
  - sRGB: 最常见的数字显示器的色彩空间。网站开发的默认色彩空间。
  - Adobe RGB: Adobe RGB 比 sRGB 提供更宽的色域。
  - DCI-P3: 常见于电视、电影。
  - Display-P3: 苹果基于 DCI-P3 提出的演变版本。所有苹果产品的显示器都使用 Display-P3 色彩空间。DCI-P3 的色域比 sRGB 色域宽近四分之一。
  - NTSC: 美国电视标准委员会制定的标准。常见于专业级影片和照片编辑的显示器。
  - EBU: 欧洲广播联盟制定的标准。
  - [ICtCp](https://www.wikiwand.com/en/ICtCp)
- LAB
  - [CIELAB (CIE L*a*b*)](https://www.wikiwand.com/zh-hans/CIELAB): 由国际照明委员会 (CIE) 制定的标准颜色空间。
    - CIELCh: CIELAB 的变体
  - Hunter LAB: 由 Richard S. Hunter 开发的 LAB 色彩空间。
  - Munsell LAB: 根据 Munsell 颜色系统开发的 LAB色彩空间。
- HSV
- HSL
- CMYK: 适用于喷墨和激光打印。
  - SWOP (Specifications for Web Offset Publications，网路印刷出版规格): 主要用于印刷杂志、目录和其他高质量印刷出版物。
  - Euroscale: 主要用于欧洲印刷，与 SWOP 相比，它的色域略有不同。
  - DIC (Dainippon Ink and Chemicals): 由日本一家油墨和化学公司开发的色彩空间。
  - FOGRA (Fogra Graphic Technology Research Association): 一种用于胶印的德国色彩空间。
  - TOYO: 一种由日本油墨制造商开发的色彩空间。
  - HKS: 图形行业中用于专色印刷的颜色空间。
  - ANPA (American Newspaper Publishers Association): 一种用于报纸印刷的颜色空间。
- YUV
  - [YCbCr](https://www.wikiwand.com/zh-hans/YCbCr)

## [CIE 色彩空间](./cie-color-space.md)

## Pantone 潘通色彩空间

潘通是一家专门开发和研究色彩而闻名全球的权威机构，也是色彩系统的供应商，提供许多行业包括印刷及其他关于颜色如数码技术、纺织、塑胶、建筑以及室内设计等的专业色彩选择和精确的交流语言。

潘通配色系统 (PMS: PANTONE MATCHING SYSTEM) 是油墨色彩方面的权威性国际参照标准。

潘通为油墨混色配方，在印刷行业通称为**专色**。所以潘通不属于 RGB 或 CMYK 的色域，而是用于延伸更多可供印刷的颜色（包括金属色及夜光色）。

## CIEXY 色度图

色度 (Chromaticity) 是无关亮度多少，颜色质量的客观规范。色度由两个互不相关的维度组成，通常是色相和饱和度。

以[标准光源 (CIE standard illuminant)](./D65.md)的色度特征为参考，所有其他的色度都可以通过极座标定义与该参考值相关的色度。

[色度图 (Chromaticity Diagram)](https://www.wikiwand.com/zh-hans/%E8%89%B2%E5%BA%A6_(%E7%89%A9%E7%90%86%E5%AD%B8))

![色彩空间对比图](https://media.githubusercontent.com/media/adoyle-h/_imgs/master/picgo/%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4%E5%AF%B9%E6%AF%94%E5%9B%BE.jpg)

## [色域](./color-gamut.md)

## 绝对色彩空间

绝对色彩空间 (Absolute Color Space) 是一种设备无关的，

`CIEXYZ`, `sRGB`, `ICtCp` 是绝对色彩空间。`CIE L*a*b*` 在[标准光](./D65.md)固定的情况下，也是绝对色彩空间。

## 色彩空间转换

「[色彩空间表示与转换](https://zhuanlan.zhihu.com/p/24281841)」([链接备份](https://archive.md/JqdJQ)) 这篇文章介绍了相同色彩模式下的不同色彩空间，是如何进行坐标转换的。

不同色彩模式下的不同色彩空间，也可以通过转到 `CIE L*a*b*` 再转成其他色彩空间坐标来转换。

![icc-workflow](https://image.benq.com/is/image/benqco/icc-workflow-2)
([链接备份](https://web.archive.org/web/20230301084526/https://image.benq.com/is/image/benqco/icc-workflow-2))

## 色彩管理

如何让不同的显示设备（如扫描仪、数码相机、显示器、打印机等）能保持相对统一的色彩表现效果。要点在于色彩管理。

![色彩管理流程](https://docs.krita.org/zh_CN/_images/Krita-colormanaged-workflow_webcomic.svg)
([链接备份](https://web.archive.org/web/20200717172532/https://docs.krita.org/zh_CN/_images/Krita-colormanaged-workflow_webcomic.svg))

分两个层面：硬件和软件。

- 硬件层面：需要显示设备的色彩精度够高，支持各种色彩空间。
- 软件层面：由色彩管理 (Color Management) 程序实现。

色彩管理程序是一种用于在各种数字图像设备之间进行可控的色彩转换的技术。
通过 ICC Profile 用于在不同操作系统和软件之间进行跨平台的色彩管理。

色彩管理分为校准测量环节、操作系统环节和应用软件环节。

1. 校准和测量
  - 校准仪器和进行色彩管理需要专门的软件，测量软件的读取方式和算法对测量的精度影响极大。市面上的色彩校准仪器一般自带有简易的配套软件，但通常功能有诸多限制，测量精度也不高。专业级的商业颜色管理软件价格高昂。在开源软件中 Argyll CMS 配合其图形化前端 DisplayCAL 能实现专业级的设备校准和色彩管理。
2. 操作系统
  - 一般来说在设备的操作系统中加载 ICC 色彩特性文件后，操作系统会按照其中信息将源图像的信息转换成匹配目标设备显示特性的状态。主流的操作系统如 Microsoft Windows、Mac OS X 和 GNU/Linux 等都已经内置了对 ICC 规范的支持。
3. 应用软件
  - 图像处理系统如 Adobe Photoshop 和 GIMP 为了在不同的显示器和打印输出设备上保持色彩的一致性也内置了独立于操作系统以外的色彩管理模块，通过模拟目标设备的色彩空间的显示来保证编辑时的色彩能在目标设备上得到理想的效果。Mozilla Firefox 和 Safari 等网络浏览器也带有类似的功能。

### ICC Profile

ICC 色彩特性文件 (ICC Profile) 是一组用来描述色彩输入、输出设备或者某种色彩空间的特性的数据集合。因由国际色彩联盟 (ICC) 主持制定其规范而得名。

该类文件被广泛用于色彩管理，以实现让颜色在设备和文档之间保持一致。从而在目标设备上提供最佳的色彩表现、或者在其他设备上模拟文档在目标设备上的色彩表现。
此类文件的扩展名通常为 `.icc` 或 `.icm`。

现在 ICC Profile 有两个版本 [ICC v2](https://www.color.org/icc_specs2.xalter#v2) 和 [ICC v4](https://www.color.org/v4spec.xalter)。软件和硬件设备基本都支持 v2，但 v4 就不一定了。

[测试浏览器是否支持 ICC 色彩管理](https://www.colortell.com/344.html)。

[Why use ICC v4 profiles?](https://www.color.org/whyusev4.xalter) ([链接备份](https://web.archive.org/web/20221022085649/https://color.org/whyusev4.xalter))

## 各类文件如何存储色彩空间

图片编辑器或者摄像设备会把 ICC Profile 嵌入到图片文件里。
也存在不嵌入 ICC Profile 的图片，那么显示时就可能产生色差。

PDF 文件会存储 ICC Profile。所以去打印店完全可以给 PDF 文件，只要作图时的色彩模式设置是 CMYK 就没问题。

## 查看文件的 ICC Profile

用系统自带的文件管理器查看文件属性。

也可以使用 unix/linux/macos 系统自带的 `file` 命令查看图片文件的元信息，包括色彩空间（jpg 文件不会显示）。

也可以使用 `magick identify` 命令来查看，需要安装 [magick](https://imagemagick.org/)。

## 色差

产生色差的几种可能情况：

1. 使用绝对色彩空间也可能会产生色差。
  - 比如 `CIE L*a*b*` 在不同的标准光下，颜色是不一样的。即在不同的自然或者人造光照条件下，同一颜色看起来也会有所不同。所以专业人员进行色彩匹配时候需要在有标准光照的观察房中进行。
2. 应用程序缺陷。应用程序可能是图片浏览器、网页浏览器、图像编辑器。
  - 色彩空间坐标或者色彩空间转换公式写错了。
  - 不支持某些色彩空间。
  - 软件不支持 ICC v4。
  - 不支持内嵌 ICC Profile
  - 未适配硬件。
3. 系统程序缺陷。系统可能是手机系统、MacOS、Windows、Linux、BSD 等
  - 不支持某些色彩空间。
  - 不支持 ICC v4。
  - 不支持内嵌 ICC Profile
4. 硬件缺陷。硬件校准问题，色域较窄，色彩精度低等问题，导致无法准确显示颜色。
5. 显示设备支持的色彩空间色域比较小，不能表达某些颜色。这可能是硬件或软件导致的。

国际照明委员会 (CIE) 定义了颜色差异的度量标准 `ΔE*ab`。

https://www.wikiwand.com/zh-hans/%E9%A2%9C%E8%89%B2%E5%B7%AE%E5%BC%82

### 是否内嵌 ICC profile

当 ICC profile 没有嵌入图片，图片的显示以当前应用软件的 ICC profile 为准，应用软件一般是用系统默认的 IIC。
如果当前显示的色彩空间和制作图片时的色彩空间不一样，则会产生色差。

当 ICC profile 有嵌入图片，具有色彩管理功能的软件识别图片中的 ICC，然后与当前的 ICC 对比，如果相同，就直接显示图片；
如果不同，会将图片的色彩从原来的色彩空间转换到当前的色彩空间。
如果图片所用颜色超出了设备的色彩空间的色域，则会产生色差，如果没有，则不会有色差（理论是这样，但实际可能不一定，待验证）。

那么当在 Chrome 浏览器里看网页里的一张带 ICC profile 的图片。假设浏览器设置的色彩空间是 sRGB，图片用的是 Adobe RGB，显示器的是 Display-P3，那么这张图片最终显示的是什么色彩空间？应该是 Adobe RGB。

### 浏览器里的色彩管理

以 Chrome 浏览器为例，在 Chrome 浏览器 url 里输入 `chrome://flags/`，然后在页面里搜索 `color profile`，会看到默认是用系统显示器的 ICC Profile。用户可以手动改变它。

![chrome-color-profile.jpg](https://media.githubusercontent.com/media/adoyle-h/_imgs/master/github/Today-I-Learned/chrome-color-profile.jpg)

## Sketch 的色彩管理

> Sketch currently supports sRGB and P3 color profiles.
> Documents you create in the Mac app will use the sRGB color profile by default.

https://www.sketch.com/docs/designing/color-profiles/

Sketch 不支持 CMYK，所以不能用于设计印刷品。

## 专业的图片编辑器

专业的图片编辑器会提供在色彩管理方面，应该提供以下功能。

1. 创建图稿时，有选项设置图稿的色彩空间。
2. 导出图片时，有选项设置输出图片的色彩空间。
3. 取色器有色域警告的功能。当取色超出了当前色彩空间的色域范围，给出提示。

## 参考文章

- [色彩空间基础](https://zhuanlan.zhihu.com/p/24214731) ([链接备份](https://archive.md/lzuhw))
- [JIMMY CHEUNG - 色彩管理](https://www.zhangxiaochun.com/color-space-3/) ([链接备份](https://web.archive.org/web/20220927133331/https://www.zhangxiaochun.com/color-space-3/))：这篇文章记录了如何选择合适的色彩空间
