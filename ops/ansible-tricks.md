## Ansible 技巧

本文所用 Ansible 版本是 2.9。

### 跳过 always tag

使用 `--tags` 还是会执行 `tags: always` 的任务，只有用 `--skip-tags always` 才行。

`ansible-playbook --skip-tags always`。
