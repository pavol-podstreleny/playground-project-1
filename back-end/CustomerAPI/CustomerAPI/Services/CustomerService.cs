using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerAPI.services
{
    public class CustomerService : ICustomerService
    {

        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository repository)
        {
            this._customerRepository = repository;
        }
        public Task<CustomerEntity> CreateCustomer(CustomerEntity customer)
        {
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
