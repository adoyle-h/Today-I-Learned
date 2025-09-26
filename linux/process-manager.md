---
title: 进程管理器
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---

## init.d
- **简介**: `init.d` 是一个传统的Unix/Linux系统中的初始化脚本目录，通常用于启动和停止系统服务。它属于`SysVinit`的一个组成部分。
- **特点**: 提供顺序启动、停止服务的脚本，适用于基于SysV的系统。通常与`service`命令一起使用。

## [upstart](https://code.launchpad.net/upstart)
- **简介**: `upstart` 是一个事件驱动的初始化系统，最初为Ubuntu设计。它允许服务在特定事件发生时启动和停止，从而提高系统的灵活性。
- **特点**: 支持并发启动服务，能够动态管理服务的启停，适合桌面和服务器环境。

## [runit](https://smarden.org/runit/)
- **简介**: `runit` 是一个简化的服务管理工具，旨在提供快速、高效的服务监控与管理。
- **特点**: 以极简的框架提供服务启动、停止及监控功能，易于使用和配置。

## [openrc](https://github.com/OpenRC/openrc)
- **简介**: `openrc` 是一个可移植的服务管理器，通常用于Gentoo和其他Linux发行版。
- **特点**: 依赖于脚本来管理服务，提供简单的命令行接口，并支持服务的并行启动。

## [systemd](https://systemd.io/)
- **简介**: `systemd` 是现代Linux发行版中的主要初始化系统和服务管理器，旨在提升启动速度和并发能力。
- **特点**: 提供systemctl命令来管理服务，支持并发启动、依赖管理、日志记录（通过journald）和定时任务。

## SysVinit
- **简介**: `SysVinit` 是最传统的Linux初始化系统，使用一系列的脚本来管理服务的启动和终止。
- **特点**: 简单和广泛兼容，但不支持并发启动和依赖处理。

## supervisord
- **简介**: `supervisord` 是一个进程管理工具，专为管理和控制后台进程而设计，提供Web界面和命令行接口。
- **特点**: 支持监控和自动重启进程，易于配置和使用，适合开发和生产环境。

## [s6](https://skarnet.org/software/s6/index.html)
- **简介**: `s6` 是一个小型的进程管理工具，专注于提供可靠的进程监督和控制。
- **特点**: 提供灵活的处理机制，支持高效的进程监控和管理，适合需要高可靠性的环境。

[Why another supervision suite?](https://skarnet.org/software/s6/why.html)

## [s6-overlay](https://github.com/just-containers/s6-overlay)
- **简介**: `s6-overlay` 是一个为容器提供的`s6`的封装，旨在支持容器中服务的管理。
- **特点**: 将`s6`功能应用于Docker等容器环境，提供简单的集成方法。

## [daemontools](https://cr.yp.to/daemontools.html)
- **简介**: `daemontools` 是一个用于管理UNIX/Linux系统中守护进程的工具，旨在提供可靠性和简化管理。
- **特点**: 自动监控和重启失败的守护进程，提供服务管理的简易接口。

