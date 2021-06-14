using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<CustomerEntity> CreateCustomer(CustomerEntity customer)
        {
            _logger.LogInformation("Creating a new Customer...");
            CustomerEntity createdCustomer = await this._customerTableDataStore.Create(customer);
            _logger.LogInformation("Custommer with RowKey: {0} AND PartitionKey: {1} successfully created.", createdCustomer.RowKey, createdCustomer.PartitionKey);
            return createdCustomer;
        }

        public Task DeleteCustomer(TableKey key)
        {
            _logger.LogInformation("Starting deletion of customer with RowKey: {0} AND PartitionKey: {1} ...", key.RowKey, key.PartitionKey);
            return _customerTableDataStore.Delete(key);
        }

        public async Task<CustomerEntity> GetCustomerByID(TableKey key)
        {
            _logger.LogInformation("Fetching customer with RowKey: {0} AND PartitionKey: {1} ...", key.RowKey, key.PartitionKey);
            CustomerEntity customer = await _customerTableDataStore.Read(key);
            _logger.LogInformation("Customer with RowKey: {0} AND PartitionKey: {1} successfully fetched.", customer.RowKey, customer.PartitionKey);
            return customer;
        }

        public async Task<IEnumerable<CustomerEntity>> GetCustomers()
        {
            _logger.LogInformation("Fetching all customers...");
            IEnumerable<CustomerEntity> customers = await _customerTableDataStore.ReadAll();
            if (customers == null)
            {
                throw new CustomerNotExistsException($"No customers exist");
            }
            _logger.LogInformation("Successfully fetched {0} customers from.", customers.Count());
            return customers;
        }

        public async Task<CustomerEntity> UpdateCustomer(CustomerEntity customer, TableKey key)
        {
            _logger.LogInformation("Patching customer with RowKey: {0} AND PartitionKey: {1} ...", key.RowKey, key.PartitionKey);
            await GetCustomerByID(key);
            CustomerEntity customerUpdated = await this._customerTableDataStore.Update(customer, key);
            _logger.LogInformation("Customer with RowKey: {0} AND PartitionKey: {1} succesfully updated", customerUpdated.RowKey, customerUpdated.PartitionKey);
            return customerUpdated;
        }
    }
}
