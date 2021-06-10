using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

public interface ICustomerRepository
{
    Task<IEnumerable<ICustomer>> GetCustomers();
    Task<ICustomer> GetCustomerByID(TableKey key);
    Task<ICustomer> CreateCustomer(ICustomer customer);
    Task DeleteCustomer(TableKey key);
    Task<ICustomer> UpdateCustomer(ICustomer customer, TableKey key);

}