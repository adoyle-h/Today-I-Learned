---
title: webpack 配置为数组
---


[官方例子](https://github.com/webpack/webpack/tree/master/examples/multi-compiler)

[官方解释](https://webpack.github.io/docs/configuration.html#multiple-configurations)：

> multiple configurations
> In both cases you can also use an array of configurations, which are processed in parallel. They share filesystem cache and watchers so this is more efficent than calling webpack multiple times.

只是为了多次并行执行 webpack 编译。比如同时为移动端和服务端编译不同的 bundle。
