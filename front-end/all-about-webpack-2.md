---
title: 关于 webpack 2
created: 2017-03-07T13:32:20+0800
updated: 2017-03-07T13:32:20+0800
---


## Cannot assign to read only property 'exports' of object '#<Object>' (mix require and export)

https://github.com/webpack/webpack/issues/4039

不支持 import 和 module.exports 混用。

临时解决方案：

装这个包：https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs

然后在 .babelrc 里加这行即可解决。

```js
{
    plugins: [
        // temporary fix to module.exports, refer to https://github.com/englercj/resource-loader/issues/84
        'transform-es2015-modules-commonjs',
    ],
}
```

## webpack-dev-server 的 proxy 参数可为数组

https://github.com/webpack/webpack-dev-server/blob/master/lib/Server.js#L183

当 proxy 为 obejct 时会经过一次转换，传递给 `http-proxy-middleware`。

webpack-dev-server 提供的一般配置方法有时不能满足一些需求，比如只匹配根目录的访问 `/`。
但在 key 写为 `/` 会是匹配所有路由。
只有 `http-proxy-middleware` 的 custom matching 可以满足需求，详见[这个 issue](https://github.com/chimurai/http-proxy-middleware/issues/107)
这时候就需要传数组给 proxy，自定义配置。
