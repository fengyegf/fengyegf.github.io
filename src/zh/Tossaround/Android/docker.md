---
title: 安装docker
icon: mobile
date: 2024-10-21
category:
  - 教程
tag:
  - docker
---

# 前言

本期教程很干货，要是没有动手能力建议不要尝试安装思路如下

```flow
process=>operation: termux
e=>end: QEMU
start=>start: docker

process->e->start
```

我们需要在 termux 安装 QEMU 模拟器再安装 docker

### QEMU 是什么

什么是 QEMU
QEMU 是一种通用的开源计算机仿真器和虚拟器。QEMU 共有两种操作模式

全系统仿真：能够在任意支持的架构上为任何机器运行一个完整的操作系统

用户模式仿真：能够在任意支持的架构上为另一个 Linux/BSD 运行程序

### 安装准备工作

1. 安装 termux

2. 打开 termux 然后安装 wget

```bash
pkg install wget
```

3. 安装 qemu

```bash
pkg install qemu-system-x86-64-headless qemu-utils
```

4. 使用 wget 下载 Alpine Linux 文件 iso 文件

```bash
wget https://dl-cdn.alpinelinux.org/alpine/v3.13/releases/x86_64/alpine-virt-3.13.2-x86_64.iso
```

持续编写中......
