# cq-green-magpies-app

## Description

`cq-green-magpies-app` 是一个专门为了兼容 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 而设计的web QQ。

## Deploy

- 参考 [go-cqhttp 文档](https://docs.go-cqhttp.org/guide/quick_start.html) 部署 go-cqhttp。

- 修改`nuxt.config.js`中的`runtimeConfig.cq`配置，将其替换为适用于你的`go-cqhttp` websocket地址

- 启动 `cq-green-magpies-app`。
```bash
  npm install
  npm run build
  npm run start
```

