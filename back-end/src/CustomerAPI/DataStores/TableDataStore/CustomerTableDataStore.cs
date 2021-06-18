using CustomerAPI.Exceptions;
using CustomerAPI.Model;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Logging;

namespace CustomerAPI.DataStores.TableDataStore
{
    public class CustomerTableDataStore : TableDataStore<CustomerEntity>
    {

        private readonly ILogger<CustomerTableDataStore> _logger;

        public CustomerTableDataStore(
            CloudTableClient TableClient,
            ILogger<CustomerTableDataStore> logger,
            string TableName = "customer"

            ) : base(TableClient, TableName)
        {
            _logger = logger;
        }

        protected override void HandleNullableEntity(TableKey key)
        {
            if (key != null)
            {
                _logger.LogDebug("Actual key: {0} {1}", key.RowKey, key.PartitionKey);
                throw new CustomerNotExistsException($"Customer with RowKey: {key.RowKey} AND PartitionKey: {key.PartitionKey} does not exist");
            }

            throw new CustomerNotExistsException($"Customer does not exists");
        }
    }
}
