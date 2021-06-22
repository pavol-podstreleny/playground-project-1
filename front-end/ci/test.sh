if [ $# -eq 0 ]
  then
    path="../"
  else
    path="${1}"
fi

# Smoke test
docker-compose -f ${path}docker-compose-frontend.yaml -f ${path}docker-compose-frontend-dev.yaml up -d
docker-compose ps ${path}docker-compose-frontend.yaml -f ${path}docker-compose-frontend-dev.yaml ps 
docker-compose -f ${path}docker-compose-frontend.yaml -f ${path}docker-compose-frontend-dev.yaml down
