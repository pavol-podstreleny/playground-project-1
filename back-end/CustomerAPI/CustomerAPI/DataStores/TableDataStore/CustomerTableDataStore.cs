using CustomerAPI.Model;
using CustomerAPI.Utils;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.TableDataStore
{
    public class CustomerTableDataStore : TableDataStore<ICustomer,CustomerEntity>
    {
        public CustomerTableDataStore(CloudTableClient TableClient, CustomerMapper Mapper, string TableName = "customer_table") : base(TableClient, Mapper, TableName) { }
    }
}
