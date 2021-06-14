# Remove previous
docker-compose -f docker-compose.yaml -f docker-compose-dev.yaml down;

# Build images
docker image build -t palopodstreleny/customer-api:latest ./back-end/CustomerApi/CustomerAPI/;
docker image build -t palopodstreleny/storage-table-emulator:latest ./back-end/StorageTable/;
docker image build -t palopodstreleny/prometheus:latest ./monitoring/Prometheus/;
docker image build -t palopodstreleny/grafana:latest ./monitoring/Grafana/;

# Run application
docker-compose -f docker-compose.yaml -f docker-compose-dev.yaml up;
