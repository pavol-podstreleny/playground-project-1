using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

public interface ICustomerRepository
{
    Task<ICustomer> CreateCustomer(ICustomer customer);
    Task<ICustomer> GetCustomerByID(TableKey key);
    Task<ICustomer> UpdateCustomer(ICustomer customer, TableKey key);

}