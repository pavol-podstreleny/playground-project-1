FROM grafana/grafana

COPY  ./config/grafana.ini ${GF_PATHS_CONFIG}
COPY  ./config/datasource-prometheus.yaml ${GF_PATHS_PROVISIONING}/datasources/
COPY  ./config/dashboard-provider.yaml ${GF_PATHS_PROVISIONING}/dashboards/
COPY  ./config/dashboard.json /var/lib/grafana/dashboards/
