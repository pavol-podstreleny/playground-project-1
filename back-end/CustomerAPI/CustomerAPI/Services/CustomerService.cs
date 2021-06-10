using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerAPI.services
{
    public class CustomerService : ICustomerService
    {

        private readonly ICustomerRepository _customerRepository;
        private readonly ILogger<CustomerService> _logger;

        public CustomerService(ICustomerRepository repository, ILogger<CustomerService> logger)
        {
            this._logger = logger;
            this._customerRepository = repository;
        }
        public Task<CustomerEntity> CreateCustomer(CustomerEntity customer)
        {
            customer.RowKey = System.Guid.NewGuid().ToString();
            customer.PartitionKey = customer.PostalCode;
            _logger.LogInformation("Generated RowKey: {0} AND PartitionKey: {1} for new customer", customer.RowKey, customer.PartitionKey);

            return this._customerRepository.CreateCustomer(customer);
        }

        public Task DeleteCustomer(TableKey key)
        {
            return this._customerRepository.DeleteCustomer(key);
        }

        public Task<CustomerEntity> GetCustomer(TableKey key)
        {
            return this._customerRepository.GetCustomerByID(key);
        }

        public Task<IEnumerable<CustomerEntity>> GetCustomers()
        {
            return this._customerRepository.GetCustomers();
        }

        public Task<CustomerEntity> UpdateCustomer(CustomerEntity customer, TableKey key)
        {
            return this._customerRepository.UpdateCustomer(customer, key);
        }

    }
}
