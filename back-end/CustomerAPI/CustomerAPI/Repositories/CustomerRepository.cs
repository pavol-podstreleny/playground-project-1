using System.Threading.Tasks;
using CustomerAPI.DataStores.Common;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;

namespace CustomerAPI.repositories
{
    public class CustomerRepository : ICustomerRepository
    {

        private ICRUDDataStoreAsync<ICustomer, TableKey> _customerTableDataStore;
        public CustomerRepository(ICRUDDataStoreAsync<ICustomer, TableKey> tableDataStore)
        {
            this._customerTableDataStore = tableDataStore;
        }

        public void CreateCustomer(ICustomer customer)
        {
            this._customerTableDataStore.Create(customer);
        }
        public Task<ICustomer> GetCustomerByID(TableKey key)
        {
            return _customerTableDataStore.Read(key);
        }

    }
}
