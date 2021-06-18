using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Utils
{
    public interface IMapper<ENTITY_IN, ENTITY_OUT>
    {
        public ENTITY_OUT Map(ENTITY_IN entity);
        public ENTITY_IN Map(ENTITY_OUT entity);
    }
}
