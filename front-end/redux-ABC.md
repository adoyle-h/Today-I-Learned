---
title: redux 入门
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


入门必读：[redux 官方文档中文翻译](http://cn.redux.js.org/)

Action 需要有固定格式，可参考 [FSA][]。但我觉得 type，payload，meta 三个字段就足够了。没有必要有 error 字段。error 实例放在 payload 里，根据继承关系来判断是否为错误。

管理 Action Type，并且关注 Action Type 和 reducer 分发处理的关系。Action Type 可以是字符串、symbol，或许可以是个对象？（用多态来更好地扩展 reducer 内部逻辑）

使用 [normalizr][] 来管理所有 State 数据，相当于前端数据库，提供便利的语法来存储和查询数据。
[updeep][] 这个库很赞，可以用来作为工具类库。
[react-redux][] 是 react 官方组件，用来链接 react 和 redux。所以业务逻辑，数据校验等逻辑应该放哪里？

[reselect][] 暂时还没看明白干嘛用的

[normalizr]: https://github.com/gaearon/normalizr
[FSA]: https://github.com/acdlite/flux-standard-action
[updeep]: https://github.com/substantial/updeep
[react-redux]: https://github.com/reactjs/react-redux
[reselect]: https://github.com/reactjs/reselect
