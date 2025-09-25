---
title: Yarn 用法
---


## Yarn workspace 和 lerna

当 yarn workspace 和 lerna 同时使用时，需要给 `lerna.json` 加上 `"useWorkspaces": true` 来使用 Yarn workspace 的配置。
```
{
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

## workspace 导致子项目的 node_modules/.bin 被提升到父项目

这会导致问题，比如 eslint 找不到插件配置，比如子项目的依赖版本不同，都被提升到父项目，同名依赖最终的版本是不确定的。

所以得使用 `nohoist` 配置项。

> The package layout will be different between your workspace and what your users will get (the workspace dependencies will be hoisted higher into the filesystem hierarchy). Making assumptions about this layout was already hazardous since the hoisting process is not standardized, so theoretically nothing new here. If you encounter issues, try using the nohoist option

看这两个链接

- https://yarnpkg.com/lang/en/docs/workspaces/#toc-limitations-caveats
- https://yarnpkg.com/blog/2018/02/15/nohoist/

## 目前无法 nohoist 子项目本身

见 issues:

- https://github.com/yarnpkg/yarn/issues/5833
- https://github.com/yarnpkg/yarn/issues/6412
