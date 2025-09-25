---
title: EMMC
---


## 检查 emmc 健康状态

`smartctl` 无法使用，需要用 `mmc` 命令。`mmc extcsd read /dev/mmcblk`

```
eMMC Life Time Estimation A [EXT_CSD_DEVICE_LIFE_TIME_EST_TYP_A]: 0x02
eMMC Life Time Estimation B [EXT_CSD_DEVICE_LIFE_TIME_EST_TYP_B]: 0x02
eMMC Pre EOL information [EXT_CSD_PRE_EOL_INFO]: 0x01
```

`Life Time Estimation` 的 `0x02` 代表已使用了 10~20% 的寿命。如果是 `0x01`，则代表已使用了 0~10% 的寿命。

`Pre EOL information` 含义:

```
0x00 = Not defined
0x01 = Normal: consumed less than 80% of the reserved blocks
0x02 = Warning: consumed 80% of the reserved blocks
0x03 = Urgent: consumed 90% of the reserved blocks
```
