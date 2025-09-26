---
title: 进程中断
created: 2021-11-09T00:43:21+0800
updated: 2021-11-09T00:43:21+0800
---


## /proc/interrupts

`/proc/interrupts` 文件中可以看到各个 CPU 上的中断情况。

```
           CPU0
  1:          9   IO-APIC   1-edge      i8042
  4:         71   IO-APIC   4-edge      ttyS0
  6:          3   IO-APIC   6-edge      floppy
  8:          0   IO-APIC   8-edge      rtc0
  9:          0   IO-APIC   9-fasteoi   acpi
 10:          0   IO-APIC  10-fasteoi   virtio0
 11:         33   IO-APIC  11-fasteoi   uhci_hcd:usb1
 12:         15   IO-APIC  12-edge      i8042
 14:          0   IO-APIC  14-edge      ata_piix
 15:          0   IO-APIC  15-edge      ata_piix
 24:          0   PCI-MSI 81920-edge      virtio2-config
 25:    4084278   PCI-MSI 81921-edge      virtio2-req.0
 26:          0   PCI-MSI 65536-edge      virtio1-config
 27:   16839249   PCI-MSI 65537-edge      virtio1-input.0
 28:   17694267   PCI-MSI 65538-edge      virtio1-output.0
NMI:          0   Non-maskable interrupts
LOC: 2204291700   Local timer interrupts
SPU:          0   Spurious interrupts
PMI:          0   Performance monitoring interrupts
IWI:          1   IRQ work interrupts
RTR:          0   APIC ICR read retries
RES:          0   Rescheduling interrupts
CAL:          0   Function call interrupts
TLB:          0   TLB shootdowns
TRM:          0   Thermal event interrupts
THR:          0   Threshold APIC interrupts
DFR:          0   Deferred Error APIC interrupts
MCE:          0   Machine check exceptions
MCP:     105679   Machine check polls
ERR:          0
MIS:          0
PIN:          0   Posted-interrupt notification event
NPI:          0   Nested posted-interrupt event
PIW:          0   Posted-interrupt wakeup event
```

`/proc/irq/[irq_num]/smp_affinity_list` 可以查看指定中断当前绑定的 CPU。
