## 色彩空间

- [色彩空间基础](https://zhuanlan.zhihu.com/p/24214731)
- [色彩空间表示与转换](https://zhuanlan.zhihu.com/p/24281841)
- [CIE 1931 color space](https://www.wikiwand.com/en/CIE_1931_color_space#/Color_matching_functions)
  - [色匹配函数 Color Matching Function](https://www.wikiwand.com/en/CIE_1931_color_space#/Color_matching_functions)
  - [色品图 Chromaticity Diagram]
  - [ 颜色差异 Color Difference](https://www.wikiwand.com/en/Color_difference)

色彩理论是以物理学和生物学经验为根基建立的。


![色调与色温在色平图上的变化趋势](https://pic1.zhimg.com/v2-392c0561d35f056b10fb2ca5b0835fa4_b.png)

### 颜色的表达受到限制

RGB 每个颜色单位的范围是 0~255，也就是说只能表达 256 种颜色的组合，这显然是太少了。
HSL、HSB 的颜色精度比 RGB 还低，能表达的颜色更少。
当前的硬件不断升级，可能已经超过了理论能表达颜色范围和精度。

### 如果你使用 Sketch

Sketch 会显示`该文档目前使用的是 sRGB 颜色配置。可以通过以下路径进行更改：...`

https://www.sketch.com/docs/designing/color-profiles/
