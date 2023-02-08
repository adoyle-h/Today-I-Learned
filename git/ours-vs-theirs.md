## --ours vs --theirs

代码冲突时批量选择某一边的修改。

图解：https://nitaym.github.io/ourstheirs/

https://howchoo.com/g/njcyntcxmwq/git-merge-conflicts-rebase-ours-theirs#using-ourstheirs-during-a-rebase

|                           | git merge master | git rebase master |
|---------------------------|------------------|-------------------|
| Keep changes from master  | --theirs         | --ours            |
| Keep changes from feature | --ours           | --theirs          |

注意 merge 和 rebase 的参数是对调的。虽然解释合理，但是很容易弄错。
