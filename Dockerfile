# syntax=docker/dockerfile:1.4

FROM node:20-buster-slim as base

ARG PORT=6800

# 修改时区
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

# 在容器中创建一个目录
RUN mkdir -p /app/

# 定位到容器的工作目录
WORKDIR /app/

# 安装 pnpm
RUN npm i pnpm -g

# Build
FROM base as build

COPY --link package.json pnpm-lock.yaml .

# 使用pnpm 安装依赖
RUN pnpm install

COPY --link . .

# 构建应用
RUN npm run build
RUN pnpm prune

# Run
FROM base

COPY --from=build /app/.output /app/.output

EXPOSE ${PORT}

CMD ["node","run","start"]
