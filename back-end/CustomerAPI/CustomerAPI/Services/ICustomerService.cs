using CustomerAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.services
{
    public interface ICustomerService
    {
        public IEnumerable<Customer> GetAllCustomers();
        public IEnumerable<Customer> GetCustomersAfter(string id, int limit);
        public Customer GetCustomer(string id);
        public Customer UpdateCustomer(string id, Customer customer);
        public int DeleteCustomer(string id);
        public int CreateCustomer(Customer customer);
    }
}
