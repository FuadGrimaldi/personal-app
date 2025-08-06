### fe

docker build -t fuadgrimaldi/porto-frontend:latest .

docker rmi -t fuadgrimaldi/porto-frontend:latest .

docker-compose stop fe

docker-compose rm fe

docker-compose up -d fe

### be

docker build -t fuadgrimaldi/porto-backend:latest .

docker rmi -t fuadgrimaldi/porto-backend:latest .

docker-compose stop app

docker-compose rm app

docker-compose up -d app
