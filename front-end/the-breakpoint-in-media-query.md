---
title: 媒体查询的断点设置
created: 2018-08-12T21:23:27+0800
updated: 2018-08-12T21:23:27+0800
---


做响应式布局时会用到媒体查询，一般有这几种方案：

1. 全都是 max-width
2. 全都是 min-width
3. max-width min-width 混用

效果来说看不出什么差别，实质不同在于设计原则。

1. 全都是 max-width 是以桌面端优先 (Desktop First)
2. 全都是 min-width 是以移动端优先 (Mobile First)
3. max-width min-width 混用，则是为了更精确的划分设备尺寸

参考 https://stackoverflow.com/a/20301859/4622308
