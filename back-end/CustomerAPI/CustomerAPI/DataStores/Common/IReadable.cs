using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface IReadable<ENTITY,ID>
    {
        public IEnumerable<ENTITY> ReadAll();
        public ENTITY Read(ID key);

    }
}
