---
title: Jest
created: 2020-11-27T22:28:50+0800
updated: 2020-11-27T22:28:50+0800
---


## 优点

- 支持 ts、babel，意味着前后端通用
- 内建断言库，测试覆盖率
- 测试结果输出清晰明了
- 兼容 eslint
- 测试文件匹配规则方便
- 支持 test 嵌套在 describe
- 支持异步函数

## 缺点

- 执行速度比较慢。Issues: [#7963](https://github.com/facebook/jest/issues/7963)

## 断言

Jest 默认使用 [expect 库](https://jestjs.io/docs/en/expect)。
Jest 里断言叫 matcher。
使用 [`expect.extend(matchers)`](https://jestjs.io/docs/en/expect#expectextendmatchers) 来自定义 matcher。

扩展 expect 的库 [jest-extended](https://github.com/jest-community/jest-extended)


## 结合 lerna 在 Monorepo 中使用 jest

把测试套件的设置放到上层，子目录专注于写自己的测试代码就好。尽可能避免在每个子目录下创建重复的文件。

### 目录结构

```
.
├── packages/
│   ├── a
│   │   ├── jest.config.js
│   │   └── package.json
│   ├── b
│   │   ├── jest.config.js
│   │   └── package.json
│   └── c
│       ├── jest.config.js
│       └── package.json
├── jest.config.base.js
├── jest.config.js
└── package.json
```

### 每个 package 子目录的 jest.config.js

```js
'use strict';

const pkg = require('./package.json');
const base = require('../../jest.config.base.js');

module.exports = {
    ...base,
    displayName: pkg.name,
};
```

### 根目录的 jest.config.js

```js
'use strict';

const pkg = require('./package.json');
const base = require('./jest.config.base.js');

module.exports = {
    ...base,
    displayName: pkg.name,
    projects: ['<rootDir>/packages/*/jest.config.js'],
};
```

### 根目录的 jest.config.base.js

这个文件设置通用 jest 配置。

```js
'use strict';
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
module.exports = {
    // All imported modules in your tests should be mocked automatically
    // automock: false,

    // Stop running tests after `n` failures
    bail: 0,

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'test/coverage',

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        '<rootDir>/src',
    ],

    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: [],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: [
        'jest-extended',
    ],

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        // '**/__test__/**/*.[jt]s?(x)',
        '**/*.test.[tj]s?(x)',
    ],
};
```


### 根目录 package.json

```json
{
  "name": "root",
  "private": true,
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "eslint": "^6.8.0",
    "eslint-plugin-jest": "^24.1.0",
    "jest": "^26.6.3",
    "jest-extended": "^0.11.5",
    "lerna": "^3.19.0"
  }
}
```

### 子目录 package.json

```json
{
  "name": "package",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "test": "jest"
  }
}
```
