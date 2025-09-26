---
title: gitignore 与 gitkeep
created: 2020-02-11T22:09:11+0800
updated: 2020-02-11T22:09:11+0800
---


## Question

假设工作目录是这样的，

```
.
├── .gitignore
└── assets/
    ├── a/
    │   └── b/
    │       ├── .gitkeep
    │       └── c
    ├── pics/
    │   ├── .gitkeep
    │   └── 4.png
    ├── scripts/
    │   ├── .gitkeep
    │   ├── 1.js
    │   └── 2.js
    ├── styles/
    │   ├── .gitkeep
    │   └── 3.css
    └── touch
```

我想 git 仓库内只保留 assets 的目录结构，不想保存 assets 内的其他文件。

## Answer

约定目录里放一个 `.gitkeep` 文件，这只是一个普通文件，没什么特别之处。

编辑 .gitignore，输入下面这段

```
assets/**
!assets/**/
!**/.gitkeep
```

验证结果，`git add && git status -s -b`：

```
A  assets/a/b/.gitkeep
A  assets/pics/.gitkeep
A  assets/scripts/.gitkeep
A  assets/styles/.gitkeep
```

## 解释

- `assets/**`：忽略 assets/ 目录下任意深度的所有文件
- `!assets/**/`：除了 assets/ 目录下任意深度的所有目录
- `!**/.gitkeep`：除了根目录下任意深度的 .gitkeep 文件

具体看[这个文档](https://git-scm.com/docs/gitignore#_pattern_format) 对 `**` 的解释。
