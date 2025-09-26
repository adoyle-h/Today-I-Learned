---
title: CPU
---


## 用一行代码占满 CPU

```sh
# 占满单核
dd if=/dev/zero of=/dev/null

# 占满多核
for i in `seq 1 $(cat /proc/cpuinfo |grep "physical id" |wc -l)`; do dd if=/dev/zero of=/dev/null & done
```
