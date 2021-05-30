﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.Common
{
    public interface IDeletable<ID> 
    {
        public void Delete(ID id);
    }
}
