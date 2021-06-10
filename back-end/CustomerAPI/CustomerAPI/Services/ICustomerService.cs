using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

namespace CustomerAPI.services
{
    public interface ICustomerService
    {
        Task<ICustomer> GetCustomer(TableKey key);
        Task<ICustomer> CreateCustomer(ICustomer customer);
        Task<ICustomer> UpdateCustomer(ICustomer customer, TableKey key);
        Task DeleteCustomer(TableKey key);
        Task<IEnumerable<ICustomer>> GetCustomers();
    }
}
