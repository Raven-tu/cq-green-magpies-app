FROM node:20-buster-slim

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

# 把当前目录下的所有文件拷贝到 /app/ 目录下
COPY . /app/

RUN cd /app/

# 删除无用的文件
RUN rm -rf ./db

#RUN npm config set registry "https://registry.npmmirror.com"
#RUN npm i
# 设置淘宝原
# RUN yarn config set registry "https://registry.npmmirror.com"

# 使用pnpm 安装
RUN npm i pnpm -g
RUN pnpm install

# 构建应用
RUN npm run build

EXPOSE 6800
CMD ["node","run","start"]
