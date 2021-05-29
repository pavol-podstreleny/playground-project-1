using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface IDeletableAsync<ID>
    {
        public Task<int> Delete(ID id);
    }
}
