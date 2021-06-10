using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerAPI.DataStores.Common;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;
using Microsoft.Azure.Cosmos.Table;

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

        public Task DeleteCustomer(TableKey key)
        {
            return _customerTableDataStore.Delete(key);
        }

        public Task<ICustomer> GetCustomerByID(TableKey key)
        {
            return _customerTableDataStore.Read(key);
        }

        public async Task<IEnumerable<ICustomer>> GetCustomers()
        {
            var customers = await _customerTableDataStore.ReadAll();
            if(customers == null) {
                // TODO handle null customer
                return await Task.FromResult<IEnumerable<ICustomer>>(null);
            }
            return customers;
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
