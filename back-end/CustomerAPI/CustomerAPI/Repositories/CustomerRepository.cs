using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerAPI.DataStores.Common;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Exceptions;
using CustomerAPI.Model;
using Microsoft.Extensions.Logging;

namespace CustomerAPI.repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private TableDataStore<CustomerEntity> _customerTableDataStore;
        private ILogger<CustomerRepository> _logger;

        public CustomerRepository(
            TableDataStore<CustomerEntity> tableDataStore,
            ILogger<CustomerRepository> logger)
        {
            this._logger = logger;
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
                _logger.LogWarning("Customer table datastore returned no customers");
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
                throw new CustomerNotExistsException($"Could not find customer with rowKey: {key.RowKey} | partitionKey: {key.PartitionKey}");
            }

            return await this._customerTableDataStore.Update(customer, key);

        }
    }
}
