using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface ICreatableAsync<ENTITY>
    {
        public Task<ENTITY> Create(ENTITY entity);
    }
}
