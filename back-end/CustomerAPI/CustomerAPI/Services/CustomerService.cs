using CustomerAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.services
{
    public class CustomerService : ICustomerService
    {

        private readonly ICustomerRepository customerRepository;

        public CustomerService(ICustomerRepository CustomerRepository)
        {
            this._customerRepository = CustomerRepository;
        }

        public int CreateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public int DeleteCustomer(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetAllCustomers()
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomer(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomersAfter(string id, int limit)
        {
            throw new NotImplementedException();
        }

        public Customer UpdateCustomer(string id, Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
