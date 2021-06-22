if [ $# -eq 0 ]
  then
    path="../"
  else
    path="${1}"
fi

docker-compose -f ${path}docker-compose-backend.yaml -f ${path}docker-compose-backend-build.yaml push
