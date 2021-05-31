using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

public interface ICustomerRepository
{
    Task CreateCustomer(ICustomer customer);
    Task<ICustomer> GetCustomerByID(TableKey key);
}