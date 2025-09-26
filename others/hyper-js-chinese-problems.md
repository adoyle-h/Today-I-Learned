---
title: Hyper.js 中文问题
created: 2018-02-18T20:30:47+0800
updated: 2018-02-18T20:30:47+0800
---


> Hyper 是一个基于 Web 技术的 Terminal 软件，跨平台，非常漂亮，但是尝试使用的时候发现其对中文得支持并不好，会出现叠字得现象，在 qiang 外搜索到一些资料分享给大家：
>
> 让 Hyper 正常显示中文，有两个方案：
>
> 把设定文件 ~/.hyper.js 里面 TermCSS 的值改成：
>
> ```
> // 方案一
> termCSS: '.wc-node{width: 16px !important}',
> // 方案二
> termCSS: '.wc-node.unicode-node{width: 1em}',
> ```

- https://juejin.im/entry/59f18bd35188255f9b339bc4
- https://github.com/zeit/hyper/issues/2012


另外这是 hyper 的字符处理问题，详见 [issues](https://github.com/zeit/hyper/issues)，期待 hyper 2.x 版本能彻底修复这个问题。
