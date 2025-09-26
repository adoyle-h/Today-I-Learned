---
title: Typescript 与 Rollup
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


rollup + typescript 就是个坑。对于 commonjs + typescript 的模块，rollup 解析有问题。详见 https://github.com/rollup/rollup/issues/670

绕过方法：

```js
import * as moment_ from 'moment';
const moment = moment_;
```

如此画蛇添足的写法，不如弃之。
