---
title: Helm
---


**Helm 团队非常不专业，弃坑吧。**
比如很多问题修复只在 v3 修复，不在 v2 修复。
比如对于 CRD 的管理很难用。
比如 v2 出紧急 bug，修复了缺不及时发布。

## Chart

[官方最佳实践](https://helm.sh/docs/chart_best_practices/conventions/)

## Chart 依赖

[requirements.yaml](https://helm.sh/docs/chart_best_practices/dependencies/)

支持本地文件的引用

```yaml
# requirements.yaml

dependencies:
- name: nginx
  version: "1.2.3"
  repository: "file://../dependency_chart/nginx"
```

但是打包的时候得先 `helm dep up` 把其他目录的 chart 下载到当前目录的 charts 目录，然后才能 `helm package`。否则会报错 `found in requirements.yaml, but missing in charts/ directory`。


## helm upgrade

- [helm upgrade --reset-values 与 --reuse-values 的区别](https://medium.com/@kcatstack/understand-helm-upgrade-flags-reset-values-reuse-values-6e58ac8f127e) ([链接备份](https://web.archive.org/web/20220707025448/https://medium.com/@kcatstack/understand-helm-upgrade-flags-reset-values-reuse-values-6e58ac8f127e))


## helm --set 包含逗号

比如 `helm install --set ids=1,2` 会报错，因为 `,` 是作为 `--set` 的分隔符的，比如 `--set a=1,b=2` 这样。
所以正确写法是 `helm install --set ids=1\,2`。
参考 [issue](https://github.com/helm/helm/issues/2952#issuecomment-330699580)。

## helm 调试

`helm <command> --debug --dry-run` 不真的执行，只是输出命令结果。

`helm template` 渲染 template。

helm 3: `helm template <chart_name> -s templates/deployment.yaml -f ./values.yaml`

## CRD 管理

CRD 应该怎么管理？helm 在 v3 也没定好完整方案

- https://github.com/helm/helm/issues/5871
- https://joejulian.name/post/helm-v2-crd-management/ ([链接备份](https://web.archive.org/web/20221116170150/https://joejulian.name/post/helm-v2-crd-management/))


helm upgrade 升级时 helm 报错 crd 已存在，但 crd 没包含上一次更新的版本里，造成了冲突，具体报错如：
kind CustomResourceDefinition with the name "xxx" already exists in the cluster and wasn't defined in the previous release.
要处理这个问题也是得删 CRD，没找到绕过方案。

helm v2 针对 CRD 的管理给了两种方案，方案一是 CRD 独立出一个 Chart（目前用这种），方案二是用 crd-install hook
参考 https://v2.helm.sh/docs/chart_best_practices/#custom-resource-definitions

对于方案二，用 crd-install hook 意味着这个 CRD 不受 helm 版本管理，只会在 helm install 安装一次 crd，helm upgrade 不会触发 crd-install。意味着 CRD 有更新的话就只能手动去 kubectl apply 了。
而且 crd-install hook 在 helm upgrade 不会被触发，这是个已知的问题。https://github.com/helm/helm/issues/4697
所以只能用方案一。

顺便一提，helm 3 里也有两个方案，方案一是 CRD 独立出一个 Chart，方案二是抛弃了 crd-install hook，用 crds 目录来管理。
https://v3.helm.sh/docs/topics/chart_best_practices/custom_resource_definitions/


## 控制 container 启动顺序

只有在 Init 容器可以指定数组用来控制启动顺序。

https://kubernetes.io/zh/docs/concepts/workloads/pods/init-containers/
