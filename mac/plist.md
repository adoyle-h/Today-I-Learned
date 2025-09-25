---
title: Mac 自启动配置 plist
---


信息来源：https://wild-flame.github.io/guides/docs/mac-os-x-setup-guide/preference_and_settings/launch

macOS 系统的启动项会以 .plist 的文件存在于以下目录中：

- /Library/LaunchDaemons：系统启动时运行，用户不登录也会运行。
- /Library/LaunchAgents：用户登录后运行。
- ~/Library/LaunchAgents：用户自定义的用户启动项
- /System/Library/LaunchDaemons：系统自带的启动项
- /System/Library/LaunchAgents：系统自带的启动项

每个 .plist 文件中，有 3 个属性控制着是否会开机自动启动。

- KeepAlive：决定程序是否需要一直运行，如果是 false 则需要时才启动。默认 false
- RunAtLoad：开机时是否运行。默认 false。
- SuccessfulExit：此项为 true 时，程序正常退出时重启（即退出码为 0）；为 false 时，程序非正常退出时重启。此项设置时会隐含默认 RunAtLoad = true，因为程序需要至少运行一次才能获得退出状态。

- 如果 KeepAlive = false：
  - 当 RunAtLoad = false 时：程序只有在有需要的时候运行。
  - 当 RunAtLoad = true 时：程序在启动时会运行一次，然后等待在有需要的时候运行。
  - 当 SuccessfulExit = true / false 时：不论 RunAtLoad 值是什么，都会在启动时运行一次。其后根据 SuccessfulExit 值来决定是否重启。
- 如果 KeepAlive = true ：不论 RunAtLoad/SuccessfulExit 值是什么，都会启动时运行且一直保持运行状态。
