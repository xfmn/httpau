# Dockerfile
FROM node:20

# 安装 ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg pulseaudio && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 创建应用目录
WORKDIR /app

# 拷贝 Node.js 文件
COPY package*.json ./
RUN npm install
COPY . .

# 暴露端口
EXPOSE 8000

# 启动服务
CMD ["node", "server.js"]
