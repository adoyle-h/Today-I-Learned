---
title: Protocol Buffers
---


## proto2 和 proto3 的差别

## protoc-gen-lint 报错 "Timestamp" is not defined

> You need to 'import "google/protobuf/timestamp.proto";' before using it. Also the name of the type is "google.protobuf.Timestamp".

https://github.com/protocolbuffers/protobuf/issues/991#issuecomment-159423753

例子，（这里再举一个 any 的例子）

```proto
syntax = "proto3";

import "google/protobuf/any.proto";
import "google/protobuf/timestamp.proto";

message Message {
  google.protobuf.Timestamp time = 1;
  google.protobuf.Any data = 2;
}
```
