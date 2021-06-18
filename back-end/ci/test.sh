# Test Customer API
docker-compose -f ../docker-compose-backend-test.yaml up

# Smoke test
docker-compose -f ../docker-compose-backend.yaml -f ../docker-compose-backend-dev.yaml up
docker-compose ps
docker-compose -f ../docker-compose-backend.yaml -f ../docker-compose-backend-dev.yaml down
