# Test Customer API
docker-compose -f ../docker-compose-backend-test.yaml up
# Copy results of the test to agent directory
docker cp back-end_customer-api-test:/app/test/CustomerAPI.Test/TestResults $SYSTEM_DEFAULTWORKINGDIRECTORY

# Smoke test
docker-compose -f ../docker-compose-backend.yaml -f ../docker-compose-backend-dev.yaml up
docker-compose ps
docker-compose -f ../docker-compose-backend.yaml -f ../docker-compose-backend-dev.yaml down
