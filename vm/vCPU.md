---
title: 虚拟 CPU
---


在虚拟化的平台上，虚拟机（guest VM）所使用的多个虚拟 CPU（以下称 vCPU）可能是共享同一个物理 CPU（以下称 pCPU）的。VMM 负责 vCPU 的调度，当一个 vCPU 被调度到获得 pCPU 的使用权后，基于该 vCPU 运行的 guest OS 又可以调度 OS 中的各个线程/进程了。也就是说，guest OS 中的各个线程/进程分时复用了 vCPU，而各个 vCPU 又分时复用了 pCPU。


