## npm run scripts

主要参考[阮一峰的教程](https://web.archive.org/web/20220718034249/http://javascript.ruanyifeng.com/nodejs/npm.html#toc12)。

### 环境变量

> npm run 命令会自动在环境变量 $PATH 添加 node_modules/.bin 目录

### -s 参数

> npm run本身有一个参数-s，表示关闭npm本身的输出，只输出脚本产生的结果。

### 传参

命令后面加上 `--` 来传递自定义的参数。

比如 `npm run test -- anothertest.js`

### npm-run-all

[npm-run-all][] 可以同时并行和串行执行 npm 脚本。

- `npm-run-all clean lint build:*`
- `npm-run-all --parallel watch:*`

[npm-run-all]: https://github.com/mysticatea/npm-run-all

### npm run env

`npm run env` 是 npm 自带的 script，用来显示所有可以被 script 访问到的环境变量。

可以执行 `npm help run` 来查找 env 相关信息。


### 发布

参考用

```json
{
    "pub": "npm run pub-patch",
    "pub-patch": "npm-run-all version-patch pub-common",
    "pub-minor": "npm-run-all version-minor pub-common",
    "pub-major": "npm-run-all version-major pub-common",
    "pub-common": "npm publish && git push --tags && git rebase develop master && git push --all && git checkout develop",
    "version-patch": "npm version patch -m 'Bump: patch version to %s'",
    "version-minor": "npm version minor -m 'Bump: minor version to %s'",
    "version-major": "npm version major -m 'Bump: major version to %s'"
}
```
