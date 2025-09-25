---
title: 使用 browserify 和 uglifyjs
---

## 推荐使用 browserify 编译成 UMD 格式

`browserify -s <全局变量名> <文件，或 package.json 所在目录> > <输出文件>`

一般要使用 `-s` 才能获得 `module.exports`。

browserify 可以自动读取 `package.json` 的 `main` 来指定输入文件。

`-r` 参数也很有用。

## pipe browserify 和 uglifyjs

`browserify -s foo . | uglifyjs -cm > <输出文件>`


[browserify]: https://github.com/substack/node-browserify
[uglifyjs]: https://github.com/mishoo/UglifyJS2
