using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface IUpdatable<ENTITY,ID>
    {
        public ENTITY Update(ENTITY entity, ID id);
    }
}
