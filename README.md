# 今天我学了什么 (Today I learned)

> 博观而约取，厚积而薄发。

碎片化知识笔记。

所有文件一旦创建就不会改变路径，以保证永久链接。
文章内容可能随时会改动。

部分外部链接会引用 [archive.today 链接](https://archive.today/)，以保证永久链接。
由于 archive.today 可能被国内屏蔽，因此建议挂代理浏览。


## 反馈问题或建议

本项目不接受 Pull Request，如果你有什么好的想法，或者改进的建议，请使用 [Issue][] 与我探讨。

**建议 Watch 或 Star 本项目。但不要 Fork，这没有意义。**

[Issue]: https://github.com/adoyle-h/Today-I-Learned/issues


## 版权声明

Copyright (c) 2016-2021 ADoyle (adoyle.h@gmail.com). The project is licensed under the **BSD 3-clause License**.

See the [LICENSE][] file for the specific language governing permissions and limitations under the License.

[LICENSE]: ./LICENSE


## TOC

<!-- toc -->
<details>
  <summary>目录</summary>

  <ul>
    <li><a href="#%E7%AE%97%E6%B3%95">算法</a></li>
    <li><a href="#android">Android</a></li>
    <li><a href="#%E8%AE%A1%E7%AE%97%E6%9C%BA">计算机</a></li>
    <li><a href="#%E8%AE%BE%E8%AE%A1">设计</a></li>
    <li><a href="#docker">Docker</a></li>
    <li><a href="#elixir">Elixir</a></li>
    <li><a href="#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B">函数式编程</a></li>
    <li>
      <a href="#%E5%89%8D%E7%AB%AF">前端</a>
      <ul>
        <li><a href="#react">React</a></li>
      </ul>
    </li>
    <li><a href="#git">Git</a></li>
    <li><a href="#go">Go</a></li>
    <li><a href="#%E7%A1%AC%E4%BB%B6">硬件</a></li>
    <li><a href="#javascript">Javascript</a></li>
    <li><a href="#k8s">K8S</a></li>
    <li><a href="#%E8%AF%AD%E8%A8%80%E8%AE%BE%E8%AE%A1">语言设计</a></li>
    <li><a href="#linux">Linux</a></li>
    <li><a href="#language%20server%20protocol%20(lsp)">Language Server Protocol (LSP)</a></li>
    <li><a href="#mac">Mac</a></li>
    <li><a href="#%E6%95%B0%E5%AD%A6">数学</a></li>
    <li><a href="#%E7%BD%91%E7%BB%9C">网络</a></li>
    <li><a href="#nodejs">Nodejs</a></li>
    <li><a href="#%E8%BF%90%E7%BB%B4">运维</a></li>
    <li><a href="#%E5%85%B6%E4%BB%96">其他</a></li>
    <li><a href="#%E5%93%B2%E5%AD%A6">哲学</a></li>
    <li><a href="#%E7%AE%B4%E8%A8%80%E5%BD%95">箴言录</a></li>
    <li><a href="#python">Python</a></li>
    <li><a href="#racket">Racket</a></li>
    <li><a href="#redis">Redis</a></li>
    <li><a href="#ruby">Ruby</a></li>
    <li><a href="#%E5%AE%89%E5%85%A8%E6%94%BB%E9%98%B2">安全攻防</a></li>
    <li><a href="#startup">Startup</a></li>
    <li>
      <a href="#%E5%AD%98%E5%82%A8">存储</a>
      <ul>
        <li><a href="#etcd">Etcd</a></li>
        <li><a href="#mongo">Mongo</a></li>
        <li><a href="#mysql">Mysql</a></li>
      </ul>
    </li>
    <li><a href="#%E6%80%9D%E8%80%83">思考</a></li>
    <li><a href="#typescript">Typescript</a></li>
    <li><a href="#vim">Vim</a></li>
    <li><a href="#%E8%99%9A%E6%8B%9F%E6%9C%BA">虚拟机</a></li>
    <li><a href="#web">Web</a></li>
  </ul>

</details>
<!-- tocstop -->

## 算法

- [Raft 算法](algorithm/raft.md)

## Android

- [Android Root](android/root.md)
- [Termux](android/termux.md)

## 计算机

记录与计算机硬件相关的知识。

- [RDMA](computer/RDMA.md)
- [单指令流多数据流 (SIMD)](computer/SIMD.md)
- [TLB](computer/TLB.md)
- [CPU 伪共享 (CPU Cache Line False Sharing)](computer/cpu-cache-line-false-sharing.md)
- [CPU 缓存](computer/cpu-cache.md)
- [CPU](computer/cpu.md)
- [风扇](computer/fan.md)
- [内存屏障](computer/memory-barrier.md)
- [我的硬盘分区规划](computer/my-disk-partitions.md)
- [随机存取存储器 (RAM)](computer/ram.md)

## 设计

记录平面设计的相关知识

- [8 点栅格](design/8-point-grid.md)
- [色彩空间](design/color-space.md)
- [UI 的加载状态](design/loading-status-of-ui.md)
- [OpenType](design/opentype.md)
- [使用 sketchtool 操作 sketch 文档：diff 以及其他功能](design/sketchtool-for-diff.md)
- [Sketch 的文本样式与颜色](design/text-style-with-colors-in-sketch.md)
- [排版](design/topography.md)

## Docker

- [Alpine 镜像](docker/alpine.md)
- [ContainerD OverlayFS](docker/containerd-overlayfs.md)
- [Containerd](docker/containerd.md)
- [容器里的 Core Dump](docker/core-dump-in-container.md)
- [device or resource busy](docker/device-or-resource-busy.md)
- [docker-compose 启动容器顺序](docker/docker-compose-startup-order.md)
- [Docker 容器与 Cgroup](docker/docker-container-and-cgroup.md)
- [进入 docker for mac 的虚拟机](docker/docker-for-mac-tty.md)
- [学习 Docker](docker/docker-learning.md)
- [Docker OverlayFS](docker/docker-overlayfs.md)
- [Docker Run With Namespace](docker/docker-run-with-namespace.md)
- [Docker Tag/Id/Digest](docker/docker-tag-id-digests.md)
- [docker 小技巧](docker/docker-tricks.md)
- [Dockerfile](docker/dockerfile.md)
- [查找 Overlay ID 与哪个容器相关](docker/find-which-container-includes-overlay.md)
- [修正 alpine 镜像的时区问题](docker/fix-timezone-in-alpine-image.md)
- [修正 Docker for mac 时区问题](docker/fix-timezone-in-docker-for-mac.md)
- [Docker for Mac 中磁盘文件占用过大](docker/large-disk-space-usage-in-docker-for-mac.md)
- [nerdctl 容器](docker/nerdctl-container.md)
- [nerdctl 网络](docker/nerdctl-network.md)
- [nerdctl](docker/nerdctl.md)
- [ping: Operation not permitted](docker/ping-operation-not-permmitted.md)
- [Podman](docker/podman.md)
- [在后台运行 docker 容器且不会自动退出](docker/run-docker-in-background.md)
- [docker security_opt](docker/security-opt.md)
- [volume](docker/volume.md)

## Elixir

- [tuple 与 list 的选择](elixir/choosing-between-tuple-and-list.md)
- [尾递归优化](elixir/tail-call-optimization.md)

## 函数式编程

- [Cache-Control](fp/cache-control.md)
- [chrome 开发者工具观察响应 Failed to load response data](fp/chrome-dev-tool-failed-to-inspect-response.md)
- [重定向 window.location 是异步的](fp/redirect-location-is-async.md)
- [什么是 Monad](fp/what-is-monad.md)

## 前端

- [SSR (Server Side Render)](front-end/SSR.md)
- [关于 webpack 2](front-end/all-about-webpack-2.md)
- [`<script async>` 与 `<script defer>`](front-end/async-defer-script-dom.md)
- [圆角的玩法](front-end/border-radius-tricks.md)
- [Safari 浏览器的类继承 Bug](front-end/class-extend-bug-in-safari.md)
- [代码分离](front-end/code-split.md)
- [颜色对比度](front-end/color-contrast.md)
- [编译前端 JS 库](front-end/compile-js-library.md)
- [contentEditable](front-end/contentEditable.md)
- [CORS](front-end/cors.md)
- [css-modules vs css-in-js](front-end/css-modules-vs-css-in-js.md)
- [CSS Selector list invalidation](front-end/css-selector-list-invalidation.md)
- [开发一个油猴 (Tampermonkey) 脚本](front-end/develop-a-tampermonkey-script.md)
- [前端类库打包的注意点](front-end/fe-library-bundle.md)
- [XMLHttpRequest 的继承者：Fetch](front-end/fetch.md)
- [浮动侧边栏](front-end/float-sidebar.md)
- [Functional CSS](front-end/functional-css.md)
- [307 Internal Redirect 与浏览器的 HSTS 功能](front-end/hsts-307.md)
- [HTTP 缓存机制](front-end/http-cache.md)
- [Input Method Editor (IME)](front-end/input-method-editor.md)
- [学习 Chrome DevTools](front-end/learning-chrome-dev-tools.md)
- [前端工程的模块控制反转](front-end/module-ioc-in-web-application.md)
- [redux 入门](front-end/redux-ABC.md)
- [Rollup Dynamic Import](front-end/rollup-dynamic-import.md)
- [script 和 link 标签的事件属性](front-end/script-link-event.md)
- [弹性滚动](front-end/scroll-bouncing.md)
- [Mac 浏览器中显示滚动条](front-end/show-scroball-in-mac.md)
- [状态机与状态图](front-end/state-machine-and-statecharts.md)
- [媒体查询的断点设置](front-end/the-breakpoint-in-media-query.md)
- [使用 browserify 和 uglifyjs](front-end/using-browserify-and-uglifyjs.md)
- [wasm](front-end/wasm.md)
- [Webkit 浏览器渲染效率](front-end/webkit-render-performance.md)
- [webpack 配置为数组](front-end/webpack-config-is-an-array.md)
- [webpack 配置](front-end/webpack-config.md)
- [Webpack Dynamic Import](front-end/webpack-dynamic-import.md)
- [奇怪的 parse html](front-end/weird-parse-html.md)
- [富文本编辑器选型](front-end/wysiwyg-editor.md)
- [z-index](front-end/z-index.md)

### React

- [使用 jquery 改变 React 的 input DOM](front-end/react/change-react-input-dom-via-jquery.md)
- [组件生命周期](front-end/react/component-lifecycle.md)
- [Compound Components](front-end/react/compound-components.md)
- [不要在 render 里直接定义 ref callback](front-end/react/dont-define-ref-callback-in-render.md)
- [ref callback 何时触发？](front-end/react/when-ref-callback-get-invoked.md)

## Git

- [用 shell 脚本查询 git commit hash](git/a-shell-script-to-get-current-commit-hash.md)
- [Git Diff](git/diff.md)
- [Git 学习资料](git/git-books.md)
- [git ssh 代理](git/git-ssh-proxy.md)
- [git 小技巧](git/git-tricks.md)
- [git credentials](git/gitcredentials.md)
- [gitignore 与 gitkeep](git/gitignore-with-gitkeep.md)
- [忽略 Git submodule](git/ignore-git-submodule.md)
- [--ours vs --theirs](git/ours-vs-theirs.md)

## Go

- [go build](go/go-build.md)
- [go doc](go/go-doc.md)
- [go generate](go/go-generate.md)
- [Go Module](go/go-module.md)
- [Golang 学习](go/golang-learning.md)
- [Gorutine](go/gorutine.md)
- [在 MacOS 上使用 gvm install](go/gvm-install-in-macos.md)
- [interface 与 nil](go/interface-vs-nil.md)

## 硬件

- [固件 (Firmware)](hardware/firmware.md)
- [网件 R6900 刷梅林固件](hardware/netgear-R6900-asuswrt-merlin.md)

## Javascript

- [babel 小技巧](javascript/babel-tricks.md)
- [JavaScript 中的相等性判断](javascript/equality-comparisons.md)
- [为什么 eval('{}') 返回 undefined ？](javascript/eval-empty-bracket.md)
- [JS 的 fiber 技术](javascript/fiber-in-js.md)
- [lodash 陷阱](javascript/lodash-trips.md)
- [Javascript Proxy](javascript/proxy.md)
- [JS 保留字](javascript/reserved-words.md)
- [尾递归优化](javascript/tail-call-optimization.md)
- [Promise 的坑](javascript/trap-of-promise.md)
- [使用 Promise 的技巧](javascript/trick-of-promise.md)
- [JS 编程技巧](javascript/tricks-of-js.md)

## K8S

- [Cilium](k8s/cilium.md)
- [调试 CrashLoopBackOff 状态的 Pod](k8s/debug-CrashLoopBackOff-pod.md)
- [Helm](k8s/helm.md)
- [Pod containerStatuses 的镜像版本与 Pod 指定版本不同](k8s/image-version-different-from-containerStatuses.md)
- [容器里装 K3S](k8s/k3s-in-container.md)
- [K8S CSI 开发](k8s/k8s-csi.md)
- [K8S Dashboard](k8s/k8s-dashboard.md)
- [K8S 部署踩坑记](k8s/k8s-deployment.md)
- [K8S 学习](k8s/k8s-learning.md)
- [K8S 资源规划](k8s/k8s-resources-management.md)
- [K8S Resource Spec](k8s/k8s_resource_spec.md)
- [kubectl 学习](k8s/kubectl.md)
- [Kubespray](k8s/kubespray.md)
- [kustomize](k8s/kustomize.md)
- [重启 Pod 中的容器](k8s/restart-container-in-pod.md)
- [configmap 和 secret 的滚动更新](k8s/rolling-update-of-configmap-and-secret.md)
- [多个 Pod 不重复部署在同一个节点上](k8s/two-pods-not-in-same-node.md)

## 语言设计

记录编程语言的内部设计与思想

- [Actor 并发模型](language/actor.md)
- [协程 (Coroutine)](language/coroutine.md)
- [CSP 并发模型](language/csp.md)

## Linux

记录 Linux 系统设计、系统命令，UNIX/Linux 命令和软件等相关知识

- [XDG 基础目录标准](linux/XDG-base-directory-spec.md)
- [ab 与 wrk 比较](linux/ab-vs-wrk.md)
- [ABI](linux/abi.md)
- [用户线程，内核线程，CPU 超线程技术](linux/about-multi-thread.md)
- [Alfred 找不到文件](linux/alfred-cannot-find-files.md)
- [ansible 部署到 centos7 时，不能找到 service](linux/ansible-deploy-fault-with-centos7-and-service.md)
- [apt](linux/apt.md)
- [bash error exit](linux/bash-error-exit.md)
- [bash history](linux/bash-history.md)
- [bash 开启 vi 模式](linux/bash-in-vi-mode.md)
- [学习 Bash](linux/bash-learning.md)
- [Bash 的坑](linux/bash-pitfalls.md)
- [Bash 小技巧](linux/bash-tricks.md)
- [BIOS](linux/bios.md)
- [BPF 与 XDP](linux/bpf-xdp.md)
- [在容器中构建 Package](linux/build-package-in-container.md)
- [CFS (Completely Fair Scheduler)](linux/cfs.md)
- [更改默认 shell](linux/change-default-shell.md)
- [命令格式标准](linux/command-arguments-syntax-standard.md)
- [linux 命令被 hash 缓存](linux/command-be-hashed.md)
- [compgen](linux/compgen.md)
- [连接 tty](linux/connect-tty.md)
- [conntrack](linux/conntrack.md)
- [上下文切换](linux/context-switch.md)
- [CPU](linux/cpu.md)
- [判断文件编码](linux/detect-encoding-of-file.md)
- [diff 与 patch](linux/diff-and-patch.md)
- [shutdown, poweroff, halt 的不同](linux/differences-between-shutdown-poweroff-halt.md)
- [硬盘分区](linux/disk-partition.md)
- [dnsmasq](linux/dnsmasq.md)
- [du](linux/du.md)
- [eBPF 与 XDP](linux/ebpf-and-xdp.md)
- [编辑二进制文件](linux/edit-binary-file.md)
- [ELF 文件](linux/elf.md)
- [终端开启真彩色 (true color)](linux/enable-true-color-in-terminal.md)
- [用环境变量替换文本内容 envsubst](linux/envsubst.md)
- [快速创建大文件](linux/fast-generate-large-file.md)
- [快速删文件](linux/fast-remove-files.md)
- [文件描述符，open file table 与 inode](linux/fd-oft-inode.md)
- [file 命令](linux/file-command.md)
- [CentOS 与 Debian 文件上的差异](linux/file-differences-between-centos-and-debian.md)
- [Linux 文件系统](linux/file-system.md)
- [find -print0 的坑](linux/find-print0-pitfall.md)
- [ftrace](linux/ftrace.md)
- [GPG 与 Keybase](linux/gpg-and-keybase.md)
- [gpg 与 gpg-agent](linux/gpg.md)
- [grep](linux/grep.md)
- [hash 命令](linux/hash-command.md)
- [Here Strings 与 Here Documents](linux/here-strings-and-here-documents.md)
- [隐藏进程](linux/hidden-process.md)
- [Hostname in Linux](linux/hostname.md)
- [查看进程的环境变量](linux/inspect-process-environment.md)
- [网络接口名称的 @](linux/interface-name-with-@.md)
- [中断](linux/interrupt.md)
- [调用原生 shell 命令](linux/invoke-origin-shell-command-with-backslash.md)
- [IO、select、epoll](linux/io-select-epoll.md)
- [iproute2 与 ifconfig 命令](linux/iproute2-vs-ifconfig.md)
- [学习 iptables](linux/iptables.md)
- [Linux 内核模块](linux/kernel-module.md)
- [kswapd0](linux/kswapd0.md)
- [Linux 日志文件](linux/log-files.md)
- [lsof 与 fuser](linux/lsof-and-fuser.md)
- [LVM (Logical Volume Manager)](linux/lvm.md)
- [制作 deb 包](linux/make-deb-package.md)
- [mdadm](linux/mdadm.md)
- [命令行中的乱码](linux/messy-codes-in-console.md)
- [创建临时文件的命令](linux/mktemp.md)
- [mount](linux/mount.md)
- [netns](linux/netns.md)
- [netstat 与 ss](linux/netstat-and-ss.md)
- [网络接口配置 (ifcfg)](linux/network-interface-configuration.md)
- [nsenter](linux/nsenter.md)
- [NTP 时间同步](linux/ntp.md)
- [OverlayFS](linux/overylay-fs.md)
- [perf 命令](linux/perf.md)
- [管道重定向](linux/pipe-redirect.md)
- [/proc/interrupts](linux/proc-interrupts.md)
- [进程内存](linux/process-memory.md)
- [慎用双引号与单引号](linux/quotes-in-bash.md)
- [命令行中提示用户 Yes/No](linux/read-prompt.md)
- [rsync 与 scp](linux/rsync-and-scp.md)
- [runit](linux/runit.md)
- [SATA 热拔插](linux/sata-hotplug.md)
- [程序的退出码 (Exit Code)](linux/script-exit-code.md)
- [在 alpine 中找不到 setup-apkcache 等 setup-* 命令](linux/setup-scripts-in-alpine.md)
- [shebang](linux/shebang.md)
- [共享内存](linux/shm.md)
- [拆分与合并文件](linux/split-and-merge-file.md)
- [SSH](linux/ssh.md)
- [sshd -R 参数](linux/sshd--R.md)
- [strace](linux/strace.md)
- [sudo and su](linux/sudo-and-su.md)
- [Linux 系统调用](linux/system-call.md)
- [systemd-resolved](linux/systemd-resolved.md)
- [systemd](linux/systemd.md)
- [tailf](linux/tailf.md)
- [基于内存的虚拟文件系统 tmpfs/ramfs/RamDisk](linux/temporary-fs-in-memory.md)
- [线程与进程](linux/thread-and-process.md)
- [time 命令](linux/time.md)
- [UNIX Domain Socket](linux/unix-domain-socket.md)
- [unlink 是删除任何文件](linux/unlink.md)
- [/usr/bin/env](linux/usr-bin-env.md)
- [虚拟内存](linux/virtual-memory.md)
- [奇怪的 ESC](linux/weird-esc-key.md)
- [Welcome Message Banner](linux/welcome-message-banner.md)
- [监听 0.0.0.0 与 127.0.0.1 的区别](linux/whats-the-difference-between-ip-address-0-0-0-0-and-127-0-0-1.md)
- [为什么创建 Daemon 进程要 Fork 两次？](linux/why-fork-twice-when-create-daemon-process.md)
- [ZFS](linux/zfs.md)
- [Zsh 的坑](linux/zsh-pitfalls.md)

## Language Server Protocol (LSP)

- https://microsoft.github.io/language-server-protocol/
- https://langserver.org/

- [YAML Language Server](lsp/yaml-language-server.md)

## Mac

- [Mac 的 DNS 问题](mac/dns-troubles-in-mac.md)
- [多网卡在 Mac 系统的问题](mac/double-network-card-problems-in-mac.md)
- [Mac 下按住键盘不能输出重复的字符](mac/hold-down-key-cannot-keep-print-character.md)
- [Homebrew](mac/homebrew.md)
- [Mac 快捷键](mac/mac-shortcuts.md)
- [用命令触发系统通知](mac/notification-with-command.md)
- [Mac 自启动配置 plist](mac/plist.md)
- [Finder 显示隐藏文件](mac/show-hidden-files-in-finder.md)
- [Tab 键不能切换弹出框的选中焦点](mac/tab-not-always-work.md)
- [xcode 重新安装](mac/xcode.md)

## 数学

数学，不仅仅是算法

- [豪斯多夫维数](math/hausdorff-besicovitch-dimension.md)
- [空间填充曲线 (Space-Filling Curve)](math/space-filling-curve.md)

## 网络

记录网络相关知识

- [ARP](network/arp.md)
- [网桥 (Bridge)](network/bridge.md)
- [DHCP](network/dhcp.md)
- [DNS SRV](network/dns_srv.md)
- [DoH 与 DoT](network/doh-and-dot.md)
- [网关 gateway](network/gateway.md)
- [HTTP Request/Response 网络包](network/http-request-and-response-package.md)
- [NAT](network/nat.md)
- [pfctl](network/pfctl.md)
- [Samba](network/samba.md)
- [TCP Buffer 大小](network/tcp-buffer-size.md)
- [vxlan](network/vxlan.md)

## Nodejs

- [MaxListenersExceededWarning](nodejs/MaxListenersExceededWarning.md)
- [命令行的工具和类库](nodejs/cli-libraries-and-tools.md)
- [不要对函数参数重新赋值](nodejs/don-t-reassign-function-arguments.md)
- [EJS 渲染引擎的空白问题](nodejs/ejs-blanks.md)
- [Error.captureStackTrace 的 stack 缺少 message 问题](nodejs/error-captureStackTrace.md)
- [fs 函数抛出的异常没有堆栈信息](nodejs/fs-error-has-no-stack.md)
- [node 中发 ICMP 包](nodejs/icmp-in-node.md)
- [Jest](nodejs/jest.md)
- [npm publish 不会包含 .gitignore 文件](nodejs/missing-gitignore-when-node-publish.md)
- [配置 node 开发环境](nodejs/node-dev.md)
- [npm 命令](nodejs/npm-commands.md)
- [npm run scripts](nodejs/npm-run-scripts.md)
- [nvm 不是一个可执行文件，而是一个函数](nodejs/nvm-is-not-a-executable-but-a-function.md)
- [npm 发包](nodejs/publish.md)
- [调整 rejectUnauthorized 选项来容许 https 证书无效](nodejs/rejectUnauthorized-of-https.md)
- [report 文件](nodejs/report-file.md)
- [require 路径名大小写问题](nodejs/require-typo.md)
- [流 (stream)](nodejs/stream.md)
- [EventEmitter 需要注意的三个地方](nodejs/three-notes-of-eventemitter.md)
- [Warning 缺少堆栈信息](nodejs/warning-missing-stack.md)
- [winston 日志库](nodejs/winston.md)
- [Yarn 用法](nodejs/yarn-usage.md)

## 运维

- [Ansible Role](ops/ansible-role.md)
- [Ansible 技巧](ops/ansible-tricks.md)
- [Ansible 变量](ops/ansible-vars.md)
- [Ansible](ops/ansible.md)
- [DNF](ops/dnf.md)
- [以太网](ops/ethernet.md)
- [IPMI 与 BMC](ops/ipmi-and-bmc.md)
- [运维小技巧 - 硬件](ops/ops-tricks-hardwares.md)
- [运维小技巧 - 网络](ops/ops-tricks-networks.md)
- [运维小技巧](ops/ops-tricks.md)
- [RPM 创建仓库](ops/rpm-create-repo.md)
- [RPM 制作和安装离线包](ops/rpm-offline-package-and-install.md)
- [YUM](ops/yum.md)

## 其他

记录各种奇奇怪怪的小知识

- [0.30000000000000004](others/0.30000000000000004.md)
- [Today I learned (TIL) 资源列表](others/TIL.md)
- [Alfred Workflow debug 技巧](others/alfred-workflow-debug.md)
- [Github Markdown 中的锚点引用](others/anchor-in-github-markdown.md)
- [永久链接](others/archive-webpage.md)
- [Chrome 小技巧](others/chrome-tricks.md)
- [Mac 文件系统的剪切快捷键](others/cut-in-mac-file-system.md)
- [YAML 中的 Date 类型陷阱](others/date-trap-in-yaml.md)
- [文件命名，下划线还是中划线？](others/file-naming-with-underscores-and-dashes.md)
- [github 中 markdown 折叠文本](others/fold-text-in-github.md)
- [从微信公众号提取原图](others/get-raw-image-from-weixin.md)
- [Github Template (模板)](others/github-template.md)
- [gRPC](others/grpc.md)
- [通过 Hash 密码到 url 来验证密码](others/hashed-password-to-url.md)
- [如何阅读标准](others/how-to-read-spec.md)
- [如何审核代码](others/how-to-review-code.md)
- [如何在 github 项目里搜索代码](others/how-to-use-github-to-browse-codes.md)
- [Hyper.js 中文问题](others/hyper-js-chinese-problems.md)
- [无法在 Tmux 显示图片](others/imgcat-not-work-in-tmux.md)
- [Jinja2](others/jinja2.md)
- [Language Server Protocol](others/language-server-protocol.md)
- [箴言](others/maxim.md)
- [元语法 （Metasyntax)](others/metasyntax.md)
- [乱码问题](others/mojibake.md)
- [终端邮件客户端 Mutt](others/mutt.md)
- [nextcloud](others/nextcloud.md)
- [NFS](others/nfs.md)
- [堆外内存](others/off-heap-memory.md)
- [原码, 反码, 补码](others/one_complement-and-two_complement.md)
- [如何打开超大文件](others/open-huge-file-with-editor.md)
- [Protocol Buffers](others/protocal-buffers.md)
- [正则表达式的小技巧](others/regexp-tricks.md)
- [在中国注册 Google 账号](others/register-google-account-in-china.md)
- [在 Github Markdown 中如何填写图片的链接](others/relative-link-in-github-markdown.md)
- [Markdown 里写反引号](others/reverse-quote-in-markdown.md)
- [Semver](others/semver.md)
- [SSL 证书](others/ssl-cert.md)
- [mac 里的 tmux 内无法用 sublime 打开文件](others/subl-in-tmux-on-mac.md)
- [vim textwidth=78 的约定](others/textwidth-78-of-vim.md)
- [KB 与 KiB 的不同](others/the-difference-between-kb-and-kib.md)
- [UTF-8 vs UTF-16](others/utf-8-vs-utf-16.md)
- [Vagrant DNS](others/vagrant-dns.md)
- [vagrant-vbguest](others/vagrant-vbguest.md)
- [查看 Chrome 通知历史列表](others/view-chrome-notification-history.md)
- [Virtualbox VBoxManage](others/virtualbox-VBoxManage.md)
- [水快速加热](others/water-heating-in-seconds.md)
- [为何 Protobuf 3 移除了 required 和 optional](others/why-protobuf-3-remove-required-and-optional.md)
- [为什么 Unicode U+F8FF 是苹果 Logo？](others/why-unicode-f8ff-is-apple-logo.md)
- [zookeeper 健康检查](others/zookeeper-health-check.md)

## 哲学

- [Toulmin Model](philosophy/toulmin-model.md)

## 箴言录

- [箴言录 - 人生](proverbs/life.md)
- [箴言录 - 哲学](proverbs/philosophy.md)
- [箴言录 - 编程](proverbs/programming.md)
- [箴言录 - 学习](proverbs/study.md)

## Python

- [python 环境配置](python/environment.md)
- [pycache](python/pycache.md)
- [Python Dockerfile](python/python-dockerfile.md)
- [Python Virtualenv](python/virtualenv.md)

## Racket

- [学习 Racket](racket/racket-learning.md)

## Redis

- [Redis Cluster](redis/cluster.md)
- [拷贝一个 Sorted Set 到新的 key](redis/copy-a-sorted-set.md)

## Ruby

- [使用 scientist 科学重构代码](ruby/using-scientist-for-refactoring.md)

## 安全攻防

- [Kali Linux](security/kali.md)
- [Reverse Shell](security/reverse-shell.md)

## Startup

- [商标注册](startup/trademark-registration.md)

## 存储

- [flyway 用法](storage/flyway-usage.md)
- [RAID](storage/raid.md)
- [物理删除与逻辑删除](storage/soft-delete.md)
- [存储](storage/storage.md)

### Etcd

- [etcdctl](storage/etcd/etcdctl.md)
- [ETCD 报错 request ignored (cluster ID mismatch)](storage/etcd/request-ignored-cluster-id-mismatch.md)

### Mongo

- [MongoDB 的丢数据问题](storage/mongo/data-lost.md)

### Mysql

- [连接 MYSQL 显示中文](storage/mysql/encoding-in-connection.md)
- [mysqldump](storage/mysql/mysqldump.md)
- [Date/Datetime/Timestamp 比较](storage/mysql/timestamp-vs-datetime.md)
- [Transaction 与 autocommit](storage/mysql/transaction-and-autocommit.md)

## 思考

记录我的碎片式思考

- [CLD 图](thinking/causal-loop-diagram.md)
- [项目代码如何组织](thinking/how-to-make-code-organization.md)
- [如何编程](thinking/how-to-programming.md)
- [不完整的函数](thinking/non-total-function.md)
- [提问的智慧](thinking/smartquestion.md)
- [讲故事](thinking/story-telling.md)

## Typescript

- [export default 的类型注明](typescript/type-annotations-for-export-default.md)
- [Typescript 与 Rollup](typescript/typescript-and-rollup.md)
- [typescript 的缺点](typescript/typescript-cons.md)

## Vim

- [学习 Neovim](vim/neovim-learning.md)
- [在 vim 中执行 shell 命令，同时将结果输出到 buffer](vim/pipe-shell-output-to-buffer.md)
- [vim 插件教程](vim/plugins-tutorial.md)
- [在 vim 中运行终端，以及如何退出终端模式](vim/run-terminal-in-vim.md)
- [sudo :write](vim/sudo-write.md)
- [VIM filetype](vim/vim-filetype.md)
- [vim-go 出现问题](vim/vim-go-fail.md)
- [学习 Vim](vim/vim-learning.md)
- [VIM 搜索和替换技巧](vim/vim-search-and-replace-tips.md)

## 虚拟机

- [KVM (Kernel-based Virtual Machine)](vm/kvm.md)
- [Libvirt 网络](vm/libvirt-network.md)
- [Libvirt](vm/libvirt.md)
- [virsh shutdown 命令无效](vm/virsh-shutdown-not-work.md)
- [virt-install Couldn't find kernel for install tree](vm/virt-install-cannot-find-kernel.md)
- [Virtualbox](vm/virtualbox.md)

## Web

记录 Web 服务开发涉及的相关知识。

- [URL QueryString 传数组参数](web/array-params-in-url.md)
- [DNS](web/dns.md)
- [国际化 SEO](web/international-SEO.md)
- [看懂 V8 项目代码](web/read-v8-project.md)
- [socket](web/socket.md)
- [下划线在 HTTP Header 里是非法字符串](web/underscore-is-invalid-in-header.md)
- [URI 转义](web/uri-encode.md)


**[⬆ 返回目录](#toc)**
