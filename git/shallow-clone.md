# git shallow clone

- 只 clone 最新数据，不下载 .git 历史: `git clone --depth 1 --single-branch "$repo" "$dir"`
- 包括 submodule: `git clone --depth 1 --single-branch --recurse-submodules --shallow-submodules "$repo" "$dir"`
- 解除 shallow，获取 .git 历史: `git fetch --unshallow` （但这种并不完全，只能获取当前分支）
- 获取 git clone --single-branch 仓库的其他远端分支:
  - 先 `git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"`。
  - 然后执行 `git fetch`。
  - 设置跟踪分支 `git branch --set-upstream-to=origin/develop develop`。
