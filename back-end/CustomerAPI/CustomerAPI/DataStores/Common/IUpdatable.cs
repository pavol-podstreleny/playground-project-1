using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface IUpdatable<ENTITY,KEY>
    {
        public ENTITY Update(ENTITY entity, KEY key);
    }
}
