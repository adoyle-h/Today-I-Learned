## Ansible

本文所用 Ansible 版本是 2.9。

### TOC

<!-- MarkdownTOC GFM -->

- [Ansible vs 写脚本](#ansible-vs-写脚本)
- [Ansible Ad-Hoc](#ansible-ad-hoc)
- [Ansible Playbook](#ansible-playbook)
    - [目录结构](#目录结构)
    - [变量优先级顺序](#变量优先级顺序)
    - [变量应该放什么位置](#变量应该放什么位置)
    - [变量作用域](#变量作用域)
    - [调试变量](#调试变量)
    - [变量的合并规则](#变量的合并规则)
    - [group_vars 目录结构](#group_vars-目录结构)
    - [Ansible 执行顺序](#ansible-执行顺序)
    - [Hosts 匹配规则](#hosts-匹配规则)
    - [Host 找不到的情况](#host-找不到的情况)
    - [立刻退出 play](#立刻退出-play)
- [Ansible Modules](#ansible-modules)
- [Ansible Plugins](#ansible-plugins)
- [ansible.cfg](#ansiblecfg)
    - [ansible.cfg 加载顺序](#ansiblecfg-加载顺序)
    - [gather_fact 缓存问题](#gather_fact-缓存问题)
- [禁止使用 include](#禁止使用-include)
- [include_ 与 import_ 的区别](#include_-与-import_-的区别)
- [其他相关资料](#其他相关资料)

<!-- /MarkdownTOC -->

### Ansible vs 写脚本

Ansible 的优势

- 步骤控制、重试、自检，步骤说明
- 多机器执行命令
- 模板渲染

Ansible 的缺点，模块和参数比较多，学习成本相对较大。

Ansible 可以直接操作 localhost，这样就可以代替写脚本。

### Ansible Ad-Hoc

https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html

### Ansible Playbook

https://galaxy.ansible.com

#### 目录结构

https://docs.ansible.com/ansible/2.9/user_guide/playbooks_best_practices.html#directory-layout

#### 变量优先级顺序

优先级分类，从低到高排序

- [Configuration settings](https://docs.ansible.com/ansible/2.9/reference_appendices/config.html) （Ansible 依次搜索 ansible.cfg 直到找到第一个，其余的 cfg 不加载）
  - ANSIBLE_CONFIG (environment variable if set)
  - ansible.cfg (in the current directory)
  - ~/.ansible.cfg (in the home directory)
  - /etc/ansible/ansible.cfg
- Command-line options
  - ansible 或 ansible-playbook 的命令行参数 (eg “-u user”)
- [Playbook keywords](https://docs.ansible.com/ansible/2.9/reference_appendices/playbooks_keywords.html#playbook-keywords)
- Variables
  - role defaults [1]
  - inventory file or script group vars [2]
  - inventory group_vars/all [3]
  - playbook group_vars/all [3]
  - inventory group_vars/* [3]
  - playbook group_vars/* [3]
  - inventory file or script host vars [2]
  - inventory host_vars/* [3]
  - playbook host_vars/* [3]
  - host facts / cached set_facts [4]
  - play vars
  - play vars_prompt
  - play vars_files
  - role vars (defined in role/vars/main.yml)
  - block vars (only for tasks in block)
  - task vars (only for the task)
  - include_vars
  - set_facts / registered vars
  - role (and include_role) params
  - include params
  - extra vars (always win precedence)


Footnotes

[1]	Tasks in each role will see their own role’s defaults. Tasks defined outside of a role will see the last role’s defaults.
[2]	(1, 2) Variables defined in inventory file or provided by dynamic inventory.
[3]	(1, 2, 3, 4, 5, 6) Includes vars added by ‘vars plugins’ as well as host_vars and group_vars which are added by the default vars plugin shipped with Ansible.
[4]	When created with set_facts’s cacheable option, variables will have the high precedence in the play, but will be the same as a host facts precedence when they come from the cache.


参考文档

- https://docs.ansible.com/ansible/2.9/reference_appendices/general_precedence.html
- https://docs.ansible.com/ansible/2.9/user_guide/playbooks_variables.html?highlight=host_vars#variable-precedence-where-should-i-put-a-variable

#### 变量应该放什么位置

> Basically, anything that goes into “role defaults” (the defaults folder inside the role) is the most malleable and easily overridden. Anything in the vars directory of the role overrides previous versions of that variable in namespace. The idea here to follow is that the more explicit you get in scope, the more precedence it takes with command line -e extra vars always winning. Host and/or inventory variables can win over role defaults, but not explicit includes like the vars directory or an include_vars task.

#### 变量作用域

- Global: this is set by config, environment variables and the command line
- Play: each play and contained structures, vars entries (vars; vars_files; vars_prompt), role defaults and vars.
- Host: variables directly associated to a host, like inventory, include_vars, facts or registered task outputs

详见 https://docs.ansible.com/ansible/2.9/user_guide/playbooks_variables.html#scoping-variables

#### 调试变量

查看 Host 作用域的变量：使用 `debug` 模块打印 `{{hostvars[inventory_hostname]}}` 里的内容。例如，

```yaml
- name: Display all variables/facts known for a host
  debug:
    var: hostvars[inventory_hostname]
```

查看 Play 作用域的变量：

查看 Global 作用域的变量：

#### 变量的合并规则

Q: 如果有相同变量名的 map 或者 list 分散在不同的 vars 文件会怎样？

A: Ansible 默认行为是同名就全部覆盖。可以用 `hash_behavior=merge` 改变这个行为，但是不要这么做，很可能会导致现有 playbook 出问题。Ansible 2.0 支持了 [combine filter](https://docs.ansible.com/ansible/2.9/user_guide/playbooks_filters.html#combining-hashes-dictionaries)。

https://stackoverflow.com/q/35554415/4622308

#### group_vars 目录结构

```
inventory/sample/group_vars/
├── all/
│   ├── all.yml
│   ├── docker.yml
│   └── openstack.yml
├── etcd.yml
└── k8s-cluster/
    ├── k8s-cluster.yml
    ├── k8s-net-flannel.yml
    └── k8s-net-weave.yml
```

- inventory/sample/group_vars/all/ 下的所有 yml 配置会合并，作用范围是 all group。
- inventory/sample/group_vars/k8s-cluster/ 下的所有 yml 配置会合并，作用范围是 k8s-cluster group。
- inventory/sample/group_vars/etcd.yml 配置作用范围是 etcd group。

参考 https://groups.google.com/forum/#!topic/ansible-project/c6t5lVCN0bw

#### Ansible 执行顺序

> This designates the following behaviors, for each role ‘x’:
>
> If roles/x/tasks/main.yml exists, tasks listed therein will be added to the play.
> If roles/x/handlers/main.yml exists, handlers listed therein will be added to the play.
> If roles/x/vars/main.yml exists, variables listed therein will be added to the play.
> If roles/x/defaults/main.yml exists, variables listed therein will be added to the play.
> If roles/x/meta/main.yml exists, any role dependencies listed therein will be added to the list of roles (1.3 and later).
> Any copy, script, template or include tasks (in the role) can reference files in roles/x/{files,templates,tasks}/ (dir depends on task) without having to path them relatively or absolutely.
> When used in this manner, the order of execution for your playbook is as follows:

- Any `pre_tasks` defined in the play.
- Any handlers triggered so far will be run.
- Each role listed in `roles` will execute in turn. Any role dependencies defined in the roles `meta/main.yml` will be run first, subject to tag filtering and conditionals.
- Any `tasks` defined in the play.
- Any handlers triggered so far will be run.
- Any `post_tasks` defined in the play.
- Any handlers triggered so far will be run.

[文档](https://docs.ansible.com/ansible/2.9/user_guide/playbooks_reuse_roles.html?#using-roles)

#### Hosts 匹配规则

| 描述        | 模式                         |
+-------------|------------------------------+
| 所有 hosts  | all (or *)                   |
| 一个 host   | host1                        |
| 多个 hosts  | host1:host2 (or host1,host2) |
| 一个 group  | webservers                   |
| 多个 Group  | webservers:dbservers         |
| 排除 groups | webservers:!atlanta          |
| groups 交集 | webservers:&staging          |

`:` 可以用 `,` 代替。

详见 https://docs.ansible.com/ansible/2.9/user_guide/intro_patterns.html#common-patterns

#### Host 找不到的情况

```yaml
- hosts: bastion[0]
  gather_facts: False
  roles:
    - { role: kubespray-defaults}
    - { role: bastion-ssh-config, tags: ["localhost", "bastion"]}
```

当 inventory 里没有设置 bastion host，那么 ansible 会提示 `[WARNING]: Could not match supplied host pattern, ignoring: bastion`，并跳过这个 play，提示 `skipping: no hosts matched`。

#### 立刻退出 play

无错误的退出用 `meta`，详见[文档](https://docs.ansible.com/ansible/2.9/modules/meta_module.html)。

```
- meta: end_play
```

有错误的退出用 `fail`，[详见](https://docs.ansible.com/ansible/2.9/modules/fail_module.html#fail-module)。

```
- fail:
    msg: This failed!
```

### Ansible Modules

查看模块文档：`ansible-doc [-l|-F|-s] [options] [-t <plugin type> ] [plugin]`


### Ansible Plugins


### ansible.cfg

#### ansible.cfg 加载顺序

- ANSIBLE_CONFIG (environment variable if set)
- ansible.cfg (in the current directory)
- ~/.ansible.cfg (in the home directory)
- /etc/ansible/ansible.cfg

从上往下找到第一个匹配的文件，其他忽略。

https://docs.ansible.com/ansible/2.9/reference_appendices/config.html

#### gather_fact 缓存问题

每个 play 默认是 `gather_facts: true` 的，如果要禁止抓取机器信息需要设置 `gather_facts: false`

ansible.cfg 有几个选项会影响到 gather_facts 的实施。

```
[defaults]
gathering = smart
gather_subset = network,hardware
fact_caching = jsonfile
fact_caching_connection = /tmp
fact_caching_timeout = 86400
```

gathering 如果是 `smart` 或者 `explicit`，除了第一次会抓取 fact 外，之后每次执行 ansible，且每个 play 之间都会利用 `fact_caching_connection` 指向目录下的缓存。如果 gathering 是 `implicit`，则每个 play 都会去抓取 fact。

`gather_subset` 会影响抓取的内容，默认是 `all` 全部抓取，也可以指定抓取内容。

`fact_caching` 的取值影响 `fact_caching_connection`。

### 禁止使用 include

`include` 的缺点是它的行为可能想象的不一致，造成大问题。且未来会 Ansible 被弃用。

可以用 `include_tasks`, `include_role`, `include_vars`, `import_role`, `import_playbook`, `import_tasks` 代替。

### include_ 与 import_ 的区别

- All import* statements are pre-processed at the time playbooks are parsed.
- All include* statements are processed as they are encountered during the execution of the playbook.

详见 https://docs.ansible.com/ansible/2.9/user_guide/playbooks_reuse_includes.html

### 其他相关资料

- [Jinja2](../others/jinja2.md)
