---
title: 前端类库打包的注意点
created: 2019-01-09T00:36:55+0800
updated: 2019-01-09T00:36:55+0800
---


注意是针对类库的，不是应用。

https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/

纠正：文中 webpack 2 太老了，在 webpack 4 的行为变了，不支持 pkg.module，Add a "sideEffects" property to your project's package.json file.
https://webpack.js.org/guides/tree-shaking/

rollup 支持 pkg.module 字段。

结论：

- 类库的 pkg.main 指向 umd 的 es5 语法的文件。
- 类库的 pkg.module 指向 esm 的 es5 语法的文件。
- 想利用 webpack 的 tree-shaking，就设置类库的 pkg.sideEffects。
