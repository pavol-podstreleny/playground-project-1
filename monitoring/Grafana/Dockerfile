FROM grafana/grafana

COPY  ./config/grafana.ini ${GF_PATHS_CONFIG}
COPY  ./config/datasource-prometheus.yaml ${GF_PATHS_PROVISIONING}/datasources/
COPY  ./config/dashboard-provider.yaml ${GF_PATHS_PROVISIONING}/dashboards/
COPY  ./config/dashboard.json /var/lib/grafana/dashboards/

ARG BUILD_NUMBER=0
ARG BUILD_TAG=local

LABEL build_tag=${BUILD_TAG}
LABEL build_number=${BUILD_NUMBER}}