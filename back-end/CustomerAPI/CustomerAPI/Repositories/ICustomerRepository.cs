using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

public interface ICustomerRepository
{
    void CreateCustomer(ICustomer customer);
    Task<ICustomer> GetCustomerByID(TableKey key);
}