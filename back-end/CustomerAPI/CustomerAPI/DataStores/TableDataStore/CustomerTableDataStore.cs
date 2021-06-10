using CustomerAPI.Model;
using Microsoft.Azure.Cosmos.Table;

namespace CustomerAPI.DataStores.TableDataStore
{
    public class CustomerTableDataStore : TableDataStore<CustomerEntity>
    {
        public CustomerTableDataStore(CloudTableClient TableClient, string TableName = "customer") : base(TableClient, TableName) { }
    }
}
