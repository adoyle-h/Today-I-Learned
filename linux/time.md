---
title: time 命令
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

<!-- editorconfig-checker-disable-file -->

当在 shell 里执行 `type time` 会提示 `time is a shell keyword`。通常我们使用的 `time` 只是 shell 内置的关键字，跟 function 一样。

然而还存在 `/usr/bin/time` 这个文件，能够显示比 `time` 更详细的信息。需要使用绝对路径来调用这个命令。

## BSD/MacOS 系统

使用方式是 `/usr/bin/time -lp echo 1`。

```sh
> /usr/bin/time -lp echo 123 > /dev/null
real 0.00
user 0.00
sys 0.00
             1458176  maximum resident set size
                   0  average shared memory size
                   0  average unshared data size
                   0  average unshared stack size
                 168  page reclaims
                   0  page faults
                   0  swaps
                   0  block input operations
                   0  block output operations
                   0  messages sent
                   0  messages received
                   0  signals received
                   1  voluntary context switches
                   6  involuntary context switches
             3367158  instructions retired
             1603063  cycles elapsed
              983744  peak memory footprint
```

MacOS 可以通过 `brew install gnu-time` 来装 `gtime` 命令。

## Linux 系统

使用方式是 `/usr/bin/time -v echo 1`。

```sh
> /usr/bin/time -v echo 123 > /dev/null
        Command being timed: "echo 123"
        User time (seconds): 0.00
        System time (seconds): 0.00
        Percent of CPU this job got: 50%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.00
        Average shared text size (kbytes): 0
        Average unshared data size (kbytes): 0
        Average stack size (kbytes): 0
        Average total size (kbytes): 0
        Maximum resident set size (kbytes): 1424
        Average resident set size (kbytes): 0
        Major (requiring I/O) page faults: 2
        Minor (reclaiming a frame) page faults: 166
        Voluntary context switches: 1
        Involuntary context switches: 3
        Swaps: 0
        File system inputs: 0
        File system outputs: 0
        Socket messages sent: 0
        Socket messages received: 0
        Signals delivered: 0
        Page size (bytes): 16384
        Exit status: 0
```
