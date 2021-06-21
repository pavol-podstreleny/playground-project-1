# Smoke test
docker-compose -f ../docker-compose-monitor.yaml -f ../docker-compose-monitor-dev.yaml up -d
docker-compose -f ../docker-compose-monitor.yaml -f ../docker-compose-monitor-dev.yaml ps
docker-compose -f ../docker-compose-frontend.yaml -f ../docker-compose-frontend-dev.yaml down
