using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface IReadableAsync<ENTITY,ROW_KEY>
    {
        public Task<IEnumerable<ENTITY>> ReadAll();
        public Task<ENTITY> Read(ROW_KEY key);
    }
}
