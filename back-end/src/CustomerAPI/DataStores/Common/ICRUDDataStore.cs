using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface ICRUDDataStore<ENTITY,ID> : 
        ICreatable<ENTITY>, 
        IDeletable<ID>, 
        IReadable<ENTITY, ID>, 
        IUpdatable<ENTITY, ID>
    {
      
    }
}
