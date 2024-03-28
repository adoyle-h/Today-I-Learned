# 指定分支与另一个远端仓库绑定

## 场景

Fork 别人的库后，我想 `git fetch` 从上游仓库拉去代码，`git push` 的时候推到我的仓库。不用每次命令行打一大串参数。

## 方法

在本地项目执行下面的操作。

1. 添加自己的远端仓库 `git remote add my git@github.com:my/repo.git`
2. 创建新分支 `git branch a`
3. 编辑的 `.git/config` 文件，添加下面这段代码。

    ```
    [branch "a"]
      remote = my
      merge = refs/heads/a
    ```

修改后你的 `.git/config` 大概是这样：

```
[core]
  ...
[remote "origin"]
	url = https://github.com/someone/repo
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[remote "my"]
	url = git@github.com:my/repo.git
	fetch = +refs/heads/*:refs/remotes/a/*
[branch "a"]
	remote = my
	merge = refs/heads/a
```

这样在分支 a 上，执行 `git push` 会推到自己的远端 my。执行 `git fetch` 会从 origin 拉取源代码。
并且不影响其他分支。

## 场景二

有时候需要所有分支只往自己的仓库 push，但 pull 从原仓库拉。

只需要编辑 `.git/config`，在 `remote "origin"` 里加一行 `pushurl` 即可。

```
[remote "origin"]
	url = https://github.com/someone/repo
  pushurl = git@github.com:my/repo.git
```
