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

This tutorial is very detailed. If you don't have hands-on ability, it is recommended not to try. The installation idea is as follows:

```flow
process=>operation: termux
e=>end: QEMU
b=>end: Alpine Linux
start=>start: docker

process->e->b->start
```

We need to install the QEMU emulator in termux, then install Alpine Linux, and finally install Docker.
::: info Note
Infinite nesting, because without root and due to the limitations of Android itself, this is the only way.
:::

### What is QEMU

QEMU is a generic and open-source machine emulator and virtualizer. QEMU has two operating modes:

Full system emulation: Run a complete operating system on any supported architecture.

User-mode emulation: Run programs for another Linux/BSD on any supported architecture.

### What is Alpine Linux

Alpine is a lightweight Linux distribution. It is lightweight not only in terms of its size but also because it has no graphical interface, only a command-line interface. This distribution is different from the common ones. Other distributions can be used after basic configuration through graphical interfaces, such as disk, timezone, etc. Alpine requires manual configuration through the command line.

### Installation Preparation

1. Install termux

2. Open termux and install wget

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

5. Create a virtual hard disk

```bash
qemu-img create -f qcow2 alpine.img 4G
```

Give it any size you want.

Then we write a startup script for convenience

```bash
vim run.sh
```

Enter the following content

```bash
#!/bin/bash
qemu-system-x86_64 -machine q35 -m 1024 -smp cpus=4 -cpu qemu64 \
-drive if=pflash,format=raw,read-only=on,file=$PREFIX/share/qemu/edk2-x86_64-code.fd \
-netdev user,id=n1,hostfwd=tcp::2222-:22 -device virtio-net,netdev=n1 \
-cdrom alpine-virt-3.13.2-x86_64.iso \
-nographic -hda alpine.img
```

6. Give the script permission and start it

```bash
chmod +x run.sh
```

```bash
./run.sh
```

The startup is slow, please be patient. When prompted to log in, enter `root` to log in.

Then we configure the network card

```bash
setup-interfaces
```

```bash
ifup eth0
```

Press Enter all the way.

After completion, you can try to ping a website. If it pings successfully, everything is normal.

```bash
ping fengyegf.cn
```

Next, install the answerfile

```bash
wget https://gist.githubusercontent.com/oofnikj/e79aef095cd08756f7f26ed244355d62/raw/answerfile
```

After successful installation, enter

```bash
sed -i -E 's/(local kernel_opts)=.*/\1="console=ttyS0"/' /sbin/setup-disk
```

Finally, install the system to the hard disk

```bash
setup-alpine -f answerfile
```

Wait for the installation to complete... It may take a long time, depending on the performance of the phone. Press Enter when prompted.

When you see `alpine:~#`, it means success. Then shut down

```bash
poweroff
```

After entering the shutdown command, it will not stop immediately. We need to wait for the system to shut down safely. After successful shutdown, modify the startup script

Enter

```bash
vim run.sh
```

Modify to the following code

```bash
qemu-system-x86_64 -machine q35 -m 2048 -smp cpus=4 -cpu qemu64 \
-drive if=pflash,format=raw,read-only=on,file=$PREFIX/share/qemu/edk2-x86_64-code.fd \
-netdev user,id=n1,hostfwd=tcp::2222-:22,hostfwd=tcp::8081-:80 -device virtio-net,netdev=n1 \
-nographic alpine.img
```

::: warning Error
BdsDxe: failed to load Boot0001 "UEFI QEMU HARDDISK QM00001 " from Pci

Root

(0x0)/Pci(0x1F,0x2)/Sata(0x0,0xFFFF,0x0): Not Found

> > Start PXE over IPv4.
> > PXE-E16: No valid offer received.
> > BdsDxe: failed to load Boot0002 "UEFI PXEv4 (MAC:525400123456)" from PciRoot(0x0)/Pci(0x2,0x0)/MAC(525400123456,0x1)/IPv4(0.0.0.0,0x0,DHCP,0.0.0.0,0.0.0.0,0.0.0.0): Not Found

> > Start PXE over IPv6.
> > PXE-E16: No valid offer received.
> > BdsDxe: failed to load Boot0003 "UEFI PXEv6 (MAC:525400123456)" from PciRoot(0x0)/Pci(0x2,0x0)/MAC(525400123456,0x1)/IPv6(0000:0000:0000:0000:0000:0000:0000:0000,0x0,Static,0000:0000:0000:0000:0000:0000:0000:0000,0x40,0000:0000:0000:0000:0000:0000:0000:0000): Not Found

> > Start HTTP Boot over IPv4.....
> > Error: Could not retrieve NBP file size from HTTP server.

Error: Server response timeout.
BdsDxe: failed to load Boot0004 "UEFI HTTPv4 (MAC:525400123456)" from PciRoot(0x0)/Pci(0x2,0x0)/MAC(525400123456,0x1)/IPv4(0.0.0.0,0x0,DHCP,0.0.0.0,0.0.0.0,0.0.0.0)/Uri(): Not Found

> > Start HTTP Boot over IPv6.

:::

Modify to the following command

```bash
qemu-system-x86_64 -machine q35 -m 2048 -smp cpus=4 -cpu qemu64 \
-drive if=pflash,format=raw,read-only=on,file=$PREFIX/share/qemu/edk2-x86_64-code.fd \
-drive file=alpine.img,format=qcow2,if=ide \
-netdev user,id=n1,hostfwd=tcp::2222-:22,hostfwd=tcp::8081-:80 -device virtio-net,netdev=n1 \
-boot order=c \
-nographic
```

::: warning Custom Title
alpine login: root

Login incorrect

alpine login:
:::

Currently, I have no clue. Some can succeed with this command, but I failed. If you have any way to solve it, please help me improve this page or leave a comment below. Thank you.

Continuing to write...
