using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

namespace CustomerAPI.services
{
    public interface ICustomerService
    {
        Task<CustomerEntity> GetCustomer(TableKey key);
        Task<CustomerEntity> CreateCustomer(CustomerEntity customer);
        Task<CustomerEntity> UpdateCustomer(CustomerEntity customer, TableKey key);
        Task DeleteCustomer(TableKey key);
        Task<IEnumerable<CustomerEntity>> GetCustomers();
    }
}
