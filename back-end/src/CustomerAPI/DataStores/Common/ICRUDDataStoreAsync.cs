using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface ICRUDDataStoreAsync<ENTITY, ID> :
        ICreatableAsync<ENTITY>,
        IUpdatableAsync<ENTITY, ID>,
        IReadableAsync<ENTITY, ID>,
        IDeletableAsync<ID>
    {

    }
}
