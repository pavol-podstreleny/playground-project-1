# Smoke test
docker-compose -f ../docker-compose-frontend.yaml -f ../docker-compose-frontend-dev.yaml up
docker-compose ps
docker-compose -f ../docker-compose-frontend.yaml -f ../docker-compose-frontend-dev.yaml down
