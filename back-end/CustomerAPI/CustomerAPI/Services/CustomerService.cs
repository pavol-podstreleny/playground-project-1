using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public void CreateCustomer(ICustomer customer)
        {
            this._customerRepository.CreateCustomer(customer);
        }

        public async Task<ICustomer> GetCustomer(TableKey key)
        {
            return await this._customerRepository.GetCustomerByID(key);
        }
    }
}
