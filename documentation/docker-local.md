### fe

docker build -t fuadgrimaldi/porto-frontend:latest .

docker rmi -t fuadgrimaldi/porto-frontend:latest .

docker-compose stop fe

docker-compose rm fe

docker-compose up -d fe

### be

#### Build an image from a Dockerfile

docker build -t fuadgrimaldi/porto-backend:latest .

docker rmi -t fuadgrimaldi/porto-backend:latest .

docker-compose stop app

docker-compose rm app

docker-compose up -d app

### cek network

docker network ls

docker network inspect <nama-network>

### Run image, membuat container dari image

```
PS C:\Users\fuad grimaldi> docker run -d --name fe-web -p 3000:3000 3154a4a0c13a
140ef4bdd13f24430084dd2a0cd93140055ba73611c922a3243062081b6aadff
PS C:\Users\fuad grimaldi> docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                    NAMES
140ef4bdd13f   3154a4a0c13a   "docker-entrypoint.s…"   4 seconds ago   Up 4 seconds   0.0.0.0:3000->3000/tcp   fe-web
PS C:\Users\fuad grimaldi> docker stop fe-web
```
