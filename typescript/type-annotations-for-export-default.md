---
title: export default 的类型注明
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

## 问题

```typescript
import * as webpack from 'webpack';
export default: webpack.Configuration {
    ...
};
```

这样写会报错。

## 答案

```typescript
import * as webpack from 'webpack'

export default {
    ...
} as webpack.Configuration
```

详见 https://github.com/Microsoft/TypeScript/issues/13626#issuecomment-471234355

## export default is bad in Typescript

```typescript
export {default as X} from '...';
```

当别的库使用这个 `X` 会丢失类型，别的库识别到的是名为 default 的类型。应该是个 Bug。

其他理由: https://basarat.gitbook.io/typescript/main-1/defaultisbad ([链接备份](https://web.archive.org/web/20230127095336/https://basarat.gitbook.io/typescript/main-1/defaultisbad))
