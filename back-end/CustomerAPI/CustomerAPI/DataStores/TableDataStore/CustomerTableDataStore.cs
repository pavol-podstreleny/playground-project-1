using CustomerAPI.Model;
using CustomerAPI.Utils;
using Microsoft.Azure.Cosmos.Table;
using CustomerAPI.DataStores.TableDataStore.Mapper;

namespace CustomerAPI.DataStores.TableDataStore
{
    public class CustomerTableDataStore : TableDataStore<ICustomer, CustomerEntity>
    {
        public CustomerTableDataStore(
            CloudTableClient TableClient, 
            CustomerMapper Mapper, 
            ITableEntityMapper<ICustomer> tableEntityMapper,
            string TableName = "customer") : base(TableClient, Mapper, TableName, tableEntityMapper) { }
    }
}
