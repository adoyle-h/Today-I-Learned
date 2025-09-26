---
title: 在 MacOS 中找不到 C 程序的标准头文件
created: 2024-04-04T16:29:06+0800
updated: 2024-04-04T16:29:06+0800
---


比如 stdio.h，在 MacOS 中编译会报错找不到该文件。

这是因为在 Linux 系统里标准头文件默认放在 `/usr/include`，但 MacOS 里没有这个目录。

## 解决方法

1. 安装 [Xcode](https://developer.apple.com/xcode/)。
2. 在 ~/.bashrc 文件中设置环境变量：

    ```sh
    MACOSX_SDK="/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk"
    export LIBRARY_PATH="$MACOSX_SDK/usr/lib"
    export CPATH="$MACOSX_SDK/usr/include"
    ```
