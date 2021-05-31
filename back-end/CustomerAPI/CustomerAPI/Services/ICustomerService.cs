using System.Threading.Tasks;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

namespace CustomerAPI.services
{
    public interface ICustomerService
    {
        Task<ICustomer> GetCustomer(TableKey key);
        Task CreateCustomer(ICustomer customer);
    }
}
