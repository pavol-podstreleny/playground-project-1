using System;
using System.Threading.Tasks;
using CustomerAPI.DataStores.Common;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

namespace CustomerAPI.repositories
{
    public class CustomerRepository : ICustomerRepository
    {

        private ICRUDDataStoreAsync<ICustomer, TableKey> _customerTableDataStore;
        public CustomerRepository(ICRUDDataStoreAsync<ICustomer, TableKey> tableDataStore)
        {
            this._customerTableDataStore = tableDataStore;
        }

        public Task<ICustomer> CreateCustomer(ICustomer customer)
        {
            return this._customerTableDataStore.Create(customer);
        }
        public Task<ICustomer> GetCustomerByID(TableKey key)
        {
            return _customerTableDataStore.Read(key);
        }
        public async Task<ICustomer> UpdateCustomer(ICustomer customer, TableKey key)
        {
            // Fetch customer with specifi key
            ICustomer potentialCustomer = await GetCustomerByID(key);
            if(potentialCustomer == null){
                // Customer does not exists in the tabl
                throw new ArgumentException($"Could not find customer with rowKey: {key.RowKey} | partitionKey: {key.PartitionKey}");
            }
            
            return await this._customerTableDataStore.Update(customer,key);
          
        }
    }
}
