using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerAPI.DataStores.Common;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

namespace CustomerAPI.repositories
{
    public class CustomerRepository : ICustomerRepository
    {

        private ICRUDDataStoreAsync<CustomerEntity, TableKey> _customerTableDataStore;
        public CustomerRepository(ICRUDDataStoreAsync<CustomerEntity, TableKey> tableDataStore)
        {
            this._customerTableDataStore = tableDataStore;
        }

        public Task<CustomerEntity> CreateCustomer(CustomerEntity customer)
        {
            return this._customerTableDataStore.Create(customer);
        }

        public Task DeleteCustomer(TableKey key)
        {
            return _customerTableDataStore.Delete(key);
        }

        public Task<CustomerEntity> GetCustomerByID(TableKey key)
        {
            return _customerTableDataStore.Read(key);
        }

        public async Task<IEnumerable<CustomerEntity>> GetCustomers()
        {
            IEnumerable<CustomerEntity> customers = await _customerTableDataStore.ReadAll();
            if (customers == null)
            {
                // TODO handle null customer
                return await Task.FromResult<IEnumerable<CustomerEntity>>(null);
            }
            return customers;
        }

        public async Task<CustomerEntity> UpdateCustomer(CustomerEntity customer, TableKey key)
        {
            // Fetch customer with specifi key
            CustomerEntity potentialCustomer = await GetCustomerByID(key);
            if (potentialCustomer == null)
            {
                // Customer does not exists in the tabl
                throw new ArgumentException($"Could not find customer with rowKey: {key.RowKey} | partitionKey: {key.PartitionKey}");
            }

            return await this._customerTableDataStore.Update(customer, key);

        }
    }
}
