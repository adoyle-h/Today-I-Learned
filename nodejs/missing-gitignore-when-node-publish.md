---
title: npm publish 不会包含 .gitignore 文件
---


> If there is a .gitignore file, and .npmignore is missing, .gitignore's contents will be used instead: That means .npmignore trumps .gitignore: They are not merged. Furthermore, .gitignore will be renamed to .npmignore in the resulting tarball.

可以在 [npm wiki](https://github.com/npm/npm/wiki/Files-and-Ignores#details-1) 上看到这段话，以及更多细则。

根据 [npm #7252](https://github.com/npm/npm/issues/7252) 和 [npm #1862](https://github.com/npm/npm/issues/1862) 里的讨论，可以看到官方坚定不改的态度。

## 这会有什么影响？

通常你使用脚手架工具时，如果需要有个 .gitignore 模板，但因为这个机制，导致 .gitignore 文件无法写到 npm 包中。

## 解决方案

目前只能靠脚手架工具本身提供支持。比如将模板里名为 `gitignore` 的文件，执行构建时自动转成 `.gitignore` 文件。

比如 [egg-init][] 就提供了这类[转换](https://github.com/eggjs/egg-init/blob/db54e1ed39dd4266fcf11af137ec29cca9e868e4/lib/init_command.js#L32)。
[facebook/create-react-app](https://github.com/facebook/create-react-app/pull/79) 也做了特殊处理。

反倒是最家喻户晓的 yo generator 居然[没有这类功能](https://github.com/yeoman/generator/issues/812)。So pathetic.


[egg-init]: https://github.com/eggjs/egg-init
