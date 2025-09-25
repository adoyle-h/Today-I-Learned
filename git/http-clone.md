---
title: git http clone
---


## https clone github 需要用户名和密码

几种方法：

1. `git clone https://github.com/user/repo.git`，每次都会弹出用户名和密码的输入框。
2. `git clone https://user:pass@github.com/user/repo.git`。直接 clone，但是缺点是密码记录在了 shell history。
3. 安装 [git-credential-manager](https://github.com/git-ecosystem/git-credential-manager)。它会安全存储用户名和密码。
4. 给仓库设置 `git config credential.helper store`。
  - 然后执行方法 1，输入用户名和密码，它就会存储在 `~/.git-credentials` 或 `$XDG_CONFIG_HOME/git/credentials`。（WARN: git 文档这么写的，但我实际没找到）
  - 但这不安全，它是明文存储的。
  - 在 MacOS，`credential.helper` 默认是 `osxkeychain`。

建议密码都使用 [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)。
