## LVM (Logical Volume Manager)

### 上层概念

- 物理卷 (PV)：一个可供存储LVM的块设备. 例如: 一块硬盘, 一个MBR或GPT分区, 一个回环文件, 一个被内核映射的设备 (例如 dm-crypt).它包含一个特殊的LVM头。
- 卷组 (VG)：物理卷的一个组，作为存放逻辑卷的容器。 PEs are allocated from a VG for a LV.
  - 类型：--type linear|striped|snapshot|raid|mirror|thin|thin-pool|vdo|vdo-pool|cache|cache-pool|writecache
- 逻辑卷 (LV)："虚拟/逻辑卷"存放在一个卷组中并由物理块组成。是一个类似于物理设备的块设备，例如，你可以直接在它上面创建一个文件系统文件系统。
- 物理块 (PE)：一个卷组中最小的连续区域(默认为4 MiB)，多个物理块将被分配给一个逻辑卷。你可以把它看成物理卷的一部分，这部分可以被分配给一个逻辑卷。

### 下层组件

- [Device Mapper](./device-mapper.md)

### 功能

快照（写时拷贝），扩容。
