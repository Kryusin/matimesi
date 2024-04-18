## 環境構築方法
```
parent -----
        | ----- products
        |          | ----- matimesi
        |          | ----- Dockerfile
        |
        | ----- docker-compose.yml
```
docker-compose.yml
-
```
version: '3.8'

services:
  fenrir:
    container_name: fenrir
    build: ./product
    working_dir: /app/matimesi
    tty: true
    environment:
      - WATCHPACK_POLLING=true
    volumes:
      - ./product:/app
    ports:
      - 3010:3000
    command: sh -c "npm i && npm run dev"
```
Dockerfile
-
```
FROM node:latest

# 作業ディレクトリ
WORKDIR /app/matimesi

# create-next-appをインストール
RUN npm install -g npm@latest && npm update
```

.env.local
-
.env.exampleを.env.localに書き換える又は複製。
```
NEXT_PUBLIC_API_KEY={リクルートWebサービスAPIキー}
```

### 上記のコードを記述したうえで以下のコマンドを実行
```
cd {parent}
docker compose up -d --build
// logを見る場合
docker compose logs -f fenrir
```
[http://localhost:3010](http://localhost:3010)
