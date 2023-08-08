# syntax=docker/dockerfile:1.4

FROM node:20-buster-slim as base

ARG PORT=3000

# 修改时区
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

# RUN npm config set registry https://registry.npmmirror.com/

RUN npm install pnpm -g

# 在容器中创建一个目录
RUN mkdir -p /app/
# 定位到容器的工作目录
WORKDIR /app

# Build
FROM base as build

# 把当前目录下的所有文件拷贝到 /app/ 目录下
COPY . /app/

# 使用npm 安装依赖
# RUN pnpm config set registry https://registry.npmmirror.com/
RUN pnpm install

# 构建应用
RUN pnpm run build
RUN pnpm prune

# Run
FROM base

COPY --from=build /app/.output /app/.output
COPY --from=build /app/node_modules /app/node_modules

EXPOSE ${PORT}

ENTRYPOINT ["node", "/app/.output/server/index.mjs"]

