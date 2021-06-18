using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

public interface ICustomerRepository
{
    Task<IEnumerable<CustomerEntity>> GetCustomers();
    Task<CustomerEntity> GetCustomerByID(TableKey key);
    Task<CustomerEntity> CreateCustomer(CustomerEntity customer);
    Task DeleteCustomer(TableKey key);
    Task<CustomerEntity> UpdateCustomer(CustomerEntity customer, TableKey key);

}