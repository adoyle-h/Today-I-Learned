---
title: kustomize
---


https://github.com/kubernetes-sigs/kustomize

## kustomization.yaml

- [kustomization.yaml 模板](https://github.com/kubernetes-sigs/kustomize/tree/master/examples)
- [Kustomization.yaml Reference](https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/)

## Overlay

kustomize 的原理是用渲染出不同的层，然后叠加合并所有层得到最终的 K8S YAML。

所以 kustomize newTag 的作用范围只能在当前层，无法影响上一层。参考这个 [Issue](https://github.com/kubernetes-sigs/kustomize/issues/915)。这就导致开发者要写很多不必要的内容。

## 目录结构

### 单项目，多环境

一个项目就是全部项目。

<details><summary>目录结构</summary>

```
project/
├── base/
│   ├── resources/
│   └── kustomization.yaml
├── local/
│   ├── resources/
│   └── kustomization.yaml
├── dev/
│   ├── resources/
│   └── kustomization.yaml
├── prod/
│   ├── ap-southeast-1/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   ├── base/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   └── cn-hangzhou/
│       ├── resources/
│       └── kustomization.yaml
├── stage/
│   ├── ap-southeast-1/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   ├── base/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   └── cn-hangzhou/
│       ├── resources/
│       └── kustomization.yaml
└── test/
    ├── base/
    │   ├── resources/
    │   └── kustomization.yaml
    └── test-env-1/
        ├── resources/
        └── kustomization.yaml
```

</details>

### 多项目，多环境

一个完整项目是由多个项目组成。

<details><summary>目录结构</summary>

```
./
├── projects/       # git clone 每个项目作为 submodule
│   ├── project-a
│   └── project-b
├── base/           # 全都是软连接
│   ├── project-a/ -> ../projects/project-a/base/
│   └── project-b/ -> ../projects/project-b/base/
├── local/          # 全都是软连接
│   ├── project-a/ -> ../projects/project-a/local/
│   └── project-b/ -> ../projects/project-b/local/
├── dev/
│   ├── project-a/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   └── project-b/
│       ├── resources/
│       └── kustomization.yaml
├── prod_ap-southeast-1/
│   ├── project-a/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   └── project-b/
│       ├── resources/
│       └── kustomization.yaml
├── prod_cn-hangzhou/
│   ├── project-a/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   └── project-b/
│       ├── resources/
│       └── kustomization.yaml
├── stage_ap-southeast-1/
│   ├── project-a/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   └── project-b/
│       ├── resources/
│       └── kustomization.yaml
├── stage_cn-hangzhou/
│   ├── project-a/
│   │   ├── resources/
│   │   └── kustomization.yaml
│   └── project-b/
│       ├── resources/
│       └── kustomization.yaml
└── test_01/
     ├── project-a/
     │   ├── resources/
     │   └── kustomization.yaml
     └── project-b/
         ├── resources/
         └── kustomization.yaml
```

你可能会设计出下面这样的目录结构，

```
.
└── prod/
    ├── ap-southeast-1/
    │   ├── project-a/
    │   │   ├── resources/
    │   │   └── kustomization.yaml
    │   └── project-b/
    │       ├── resources/
    │       └── kustomization.yaml
    ├── base/
    │   ├── resources/
    │   ├── kustomization.yaml
    │   ├── project-a/
    │   │   ├── resources/
    │   │   └── kustomization.yaml
    │   └── project-b/
    │       ├── resources/
    │       └── kustomization.yaml
    └── cn-hangzhou/
        ├── project-a/
        │   ├── resources/
        │   └── kustomization.yaml
        └── project-b/
            ├── resources/
            └── kustomization.yaml
```

我的意见是不要在 stage，prod 等目录下创建 base 目录。因为按照语义，例如 prod/base 目录是所有 prod 子目录的 base，prod/cn-hangzhou 的内容被分为了 3 部分：prod/cn-hangzhou、prod/base、base。而每个部分又有各个项目子目录。这会增加阅读的难度和目录的复杂度。实际上 prod/cn-hangzhou 只要由 prod/cn-hangzhou 和 base 组成就足够了。

</details>



## Hash 后缀与滚动更新

configMapGenerator 和 secretGenerator 生成的资源 name 会带 hash 后缀。

> The ConfigMap declared from a ConfigMapGenerator is treated differently. A hash is appended to the name and any change in the ConfigMap will trigger a rolling update.

这是为了支持滚动更新 (rolling update)。
详见 https://github.com/kubernetes-sigs/kustomize/blob/master/examples/configGeneration.md
比如当 configmap 内容更新后，Pod 的 env 注入 configmap 虽然不会自动更新，但是 pod 的 volume 注入 ConfigMap 会自动更新。如果 Pod 也需要滚动更新，那 configmap 更新过程就会影响旧 Pod 的状态。

但是 kustomize 并不会管理旧资源，因此旧的 configmap 和 secret 还是保留的，需要手动清理。

可以通过 `generatorOptions.disableNameSuffixHash=true` 不带 hash 后缀。
详见 https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/generatoroptions/
但这样就会失去 configmap、secret 滚动更新的特性。

在[这篇文章](https://aleiwu.com/post/configmap-rollout-followup/) 也对比了 Helm 的滚动更新。

相关文章[「configmap 和 secret 的滚动更新」](./rolling-update-of-configmap-and-secret.md)。

## resource 通配符

```yaml
resources:
  - resource/*.yaml
```

以前支持，现在不支持了。https://github.com/kubernetes-sigs/kustomize/issues/119#issuecomment-400849155


## 删除某个资源

overlay 通常是叠加，但也可以用来删除资源。
编辑 kustomization.yaml 文件，

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

patchesStrategicMerge:
  - |-
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: xxx
    $patch: delete

  - |-
    apiVersion: v1
    kind: Secret
    metadata:
      name: xxx
    $patch: delete
```

https://github.com/kubernetes-sigs/kustomize/issues/1384
https://github.com/kubernetes-sigs/kustomize/issues/106

## 组件组合

[issues/1251](https://github.com/kubernetes-sigs/kustomize/issues/1251) 讨论如何实现组件在 overlay 的组合。

现在已实现 [kind: Component](https://github.com/arrikto/kubernetes-enhancements/pull/1)。
