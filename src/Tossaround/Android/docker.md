---
title: Install Docker
icon: mobile
date: 2024-10-21
category:
  - Tutorial
tag:
  - docker
---

# Introduction

This tutorial is very hands-on, if you don't have the ability to follow along, it's recommended not to try. The installation idea is as follows:

```flow
process=>operation: termux
e=>end: QEMU
start=>start: docker

process->e->start
```

We need to install the QEMU emulator in termux and then install docker.

### What is QEMU

What is QEMU?
QEMU is a generic and open-source machine emulator and virtualizer. QEMU has two operating modes:

Full system emulation: It can run a complete operating system for any machine on any supported architecture.

User-mode emulation: It can run programs for another Linux/BSD on any supported architecture.

### Preparation for Installation

1. Install termux

2. Open termux and then install wget

```bash
pkg install wget
```

3. Install qemu

```bash
pkg install qemu-system-x86-64-headless qemu-utils
```

4. Use wget to download the Alpine Linux ISO file

```bash
wget https://dl-cdn.alpinelinux.org/alpine/v3.13/releases/x86_64/alpine-virt-3.13.2-x86_64.iso
```

To be continued...
