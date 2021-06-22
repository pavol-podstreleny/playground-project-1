if [ $# -eq 0 ]
  then
    path="../"
  else
    path="${1}"
fi

# Test Customer API
docker-compose -f ${path}docker-compose-backend-test.yaml up

# Copy results of the test to agent directory
docker cp back-end_customer-api-test_1:/app/test/CustomerAPI.Test/TestResults $SYSTEM_DEFAULTWORKINGDIRECTORY

# Smoke test
docker-compose -f ${path}docker-compose-backend.yaml -f ${path}docker-compose-backend-dev.yaml up -d
docker-compose -f ${path}docker-compose-backend.yaml -f ${path}docker-compose-backend-dev.yaml ps
docker-compose -f ${path}docker-compose-backend.yaml -f ${path}docker-compose-backend-dev.yaml down