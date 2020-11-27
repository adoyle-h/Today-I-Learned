## Envoy

### 静态配置

### 动态配置

### xDS

- Listener Discovery Service (LDS) : Allows you to alter listeners while the Envoy is running
- Route Discovery Service (RDS)    : Allows you to update and change entire routes for the HTTP connection managers
- Cluster Discovery Service (CDS)  : Allows you to dynamically update cluster definitions
- Endpoint Discovery Service (EDS) : Allows you to add or remove servers that handle traffic
- Secret Discovery Service (SDS)   : Enables Envoy to discover certificates, keys and TLS information for listeners, and some peer certificates validation logic.

统称为 xDS。
