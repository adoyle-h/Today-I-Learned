---
title: 编译前端 JS 库
---


## package.json 的 main 和输出格式

作为应用，编译一个 UMD 模块就够了，因为不会被其他项目依赖。

作为类库，应该至少提供以下三种模块。

```
{
  ...
  "main": "dist/eat-fruit.cjs.js",
  "browser": "dist/eat-fruit.umd.js",
  "module": "dist/eat-fruit.mjs",
  ...
}
```

- main: CommonJS 模块。Node 加载场景。
- browser: UMD 模块。提供浏览器 `<script>` 加载。
- module: ES Module。Rollup 和 Webpack 加载用。

参考[这里](https://bagja.net/blog/bundling-your-javascript-library-with-rollup.html#different-output-format-different-minimum-environments)。

webpack 解析这三个字段用的是 [resolve.mainFields](https://www.webpackjs.com/configuration/resolve/#resolve-mainfields) 配置。

如果读的是 UMD 的包，Rollup 可能无法解析 UMD 模块的 export，会报 [name is not exported by module](https://rollupjs.org/guide/en#error-name-is-not-exported-by-module-) 的错误。


## 参考文章

- [Bundling Your JavaScript Library with Rollup](https://bagja.net/blog/bundling-your-javascript-library-with-rollup.html)
- [package.json 中 你还不清楚的 browser，module，main 字段优先级](https://github.com/Weiyu-Chen/blog/issues/8)
