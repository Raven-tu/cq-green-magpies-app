# cq-green-magpies-app

## Description

`cq-green-magpies-app` 是一个专门为了兼容 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 而设计的web QQ。

## Deploy

- 参考 [go-cqhttp 文档](https://docs.go-cqhttp.org/guide/quick_start.html) 部署 go-cqhttp。

- 修改`/server/config/CQ.jsonc`中的`CQ`配置，将其替换为适用于你的`go-cqhttp` websocket地址、端口、access_token。

- 启动 `cq-green-magpies-app`。

```bash
npm install pnpm -g
pnpm run build
pnpm run start
```

## Docker Deploy

### 容器目录说明

| 路径                 | 文件名          | 作用       |
| :------------------- | :-------------- | :--------- |
| `/app/server/config/CQ.jsonc`    | `CQ.jsonc`    | CQ.jsonc 配置文件 必填   |
| `/app/server/logs/`   | `logs`   | 日志文件夹 可选   |
| `/app/server/db/`         | `db`          | 数据库文件夹 可选|

### 创建CQ.jsonc配置文件

```json
{
  "host": "192.168.1.218",
  "port": 6800,
  "accessToken": ""
}
```

### 启动容器

```bash
#  3000 web 端口 
#  24615 web websocket 端口 不可修改

docker run -d --name cq-gm \
-p 3000:3000 \
-p 24615:24615 \
-v /somewhere/CQ.jsonc:/app/server/config/CQ.jsonc \
-v /somewhere/logs:/app/server/logs \
-v /somewhere/db:/app/server/db \
raventu/cq-green-magpies:latest
```
