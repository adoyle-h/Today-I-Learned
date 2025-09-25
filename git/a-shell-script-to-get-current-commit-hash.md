---
title: 用 shell 脚本查询 git commit hash
---


```sh
---
title: ROOT_DIR is the directory contains the `.git` folder
---

ROOT_DIR=.
HEAD=$(cat "$ROOT_DIR"/.git/HEAD)
COMMIT=$HEAD
while [ "$COMMIT" != "${COMMIT#ref: }" ]; do
  COMMIT="$(cat "$ROOT_DIR"/.git/"${COMMIT#ref: }")"
done

echo "COMMIT=$COMMIT"
```
