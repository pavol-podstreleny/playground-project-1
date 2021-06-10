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
        public Task<ICustomer> CreateCustomer(ICustomer customer)
        {
            return this._customerRepository.CreateCustomer(customer);
        }

        public Task DeleteCustomer(TableKey key)
        {
            return this._customerRepository.DeleteCustomer(key);
        }

        public Task<ICustomer> GetCustomer(TableKey key)
        {
            return this._customerRepository.GetCustomerByID(key);
        }

        public Task<IEnumerable<ICustomer>> GetCustomers()
        {
            return this._customerRepository.GetCustomers();
        }

        public Task<ICustomer> UpdateCustomer(ICustomer customer, TableKey key)
        {
            return  this._customerRepository.UpdateCustomer(customer,key);
        }
        
    }
}
