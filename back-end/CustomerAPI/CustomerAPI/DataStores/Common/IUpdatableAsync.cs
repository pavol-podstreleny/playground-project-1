using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface IUpdatableAsync<ENTITY,KEY>
    {
        public Task<ENTITY> Update(ENTITY entity, KEY key);
    }
}
