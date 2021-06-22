if [ $# -eq 0 ]
  then
    path="../"
  else
    path="${1}"
fi

# Smoke test
docker-compose -f ${path}docker-compose-monitor.yaml -f ${path}docker-compose-monitor-dev.yaml up -d
docker-compose -f ${path}docker-compose-monitor.yaml -f ${path}docker-compose-monitor-dev.yaml ps
docker-compose -f ${path}docker-compose-monitor.yaml -f ${path}docker-compose-monitor-dev.yaml down
