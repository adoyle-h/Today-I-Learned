---
title: 修改进程的内存数据
created: 2023-03-01T17:32:04+0800
updated: 2023-03-01T17:32:04+0800
---


著名的金山游侠，[Cheat Engine](https://github.com/cheat-engine/cheat-engine/) 都能修改单机游戏中的数据。俗称“金手指”。

## Windows

windows 有提供一系列 API 来操作指定进程的内存，
比如这个 [ReadProcessMemory](https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-readprocessmemory)，第一个参数就是指定进程的句柄。但需要具有 `PROCESS_VM_READ` 权限。

通过 [OpenProcess](https://docs.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-openprocess) 来获取目标进程的句柄，同时指定访问权限。

进程访问控制模型看这个

- https://docs.microsoft.com/en-us/windows/win32/secauthz/access-control
- https://docs.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights

## Linux

gdb 这类 debug、trace 工具也类似。
