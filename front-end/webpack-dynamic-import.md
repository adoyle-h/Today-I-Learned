---
title: Webpack Dynamic Import
---


## 动态变量的坑

### 现象

我用了 SSR，server 文件和 client 文件都在一个目录下。在某个文件写了 ``import(`../${path}`)``，启动编译时把 node_modules 下的很多服务端的库都扫描了一遍。（因为 server.js 引用了很多服务端库）

### 原因

答案是这个 issue (Dynamic expressions for import() are broken #4292) 的[回答](https://github.com/webpack/webpack/issues/4292#issuecomment-451034292)。
不过找到答案的过程很艰辛，直到我找到[这篇文章](https://medium.com/@oprearocks/es6-dynamic-import-and-webpack-memory-leaks-fa09f98f3243)。

因为 Webpack 的 Dynamic Import 并不是按照 JS 的执行顺序去解析 import() 里的变量。而是纯语法字面上的解析。
单纯的 `import(specifier)` 会失败，是因为 webpack import 必须要有基本的文件路径信息，而变量 `specifier` 可以代表任何值，webpack **无法猜到**你想加载具体哪个文件，所以只能把该路径下所有文件都编译成 chunk，在运行时去加载。

正如 @navono 所举的例子，`import('./app'+path+'/util')` 会生成 `/^\.\/app.*\/util$/` 这样的正则，``import(`./${path}`)`` 会生成 `/^\.\/.*$/` 这样的正则。然后 webpack 根据正则去扫描匹配的文件。
正则匹配到的文件即使没有被其他模块 import，webpack 也会编译一遍。


**还有一个坑**，有时候（不是必现），用 `//` 注释了包含 import() 的那行，webpack 依然会去执行解析，并加载编译对应路径下的所有文件。

另外，可以看下 [dynamic-import 的协议](https://github.com/tc39/proposal-dynamic-import)，虽然没多少用。

> import() accepts arbitrary strings (with runtime-determined template strings shown here), not just static string literals.


### 那么我想动态加载 node_modules 里的模块怎么办？

比如这样写 ``import(`library-${var}`)`` 或 ``import(`@my-scope/library-${var}`)``，都会导致 webpack 扫描所有 node_modules 下的文件编译。
这会造成编译一些服务端的库导致编译失败。

目前无解。


## chunk name

在 import 函数中使用 `/* webpackChunkName: 'name' */` 注释，最后生成的 chunk 文件不会以 id 命名，而会以 name 命名。

类似作用的还有，

```
/* webpackInclude: /\.json$/ */
/* webpackExclude: /\.noimport\.json$/ */
/* webpackChunkName: "my-chunk-name" */
/* webpackMode: "lazy" */
/* webpackPrefetch: true */
/* webpackPreload: true */
```

详见 [Magic Comments](https://webpack.docschina.org/api/module-methods/#magic-comments)。
