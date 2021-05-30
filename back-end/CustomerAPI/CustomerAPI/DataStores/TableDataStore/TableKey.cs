using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.TableDataStore
{
    public class TableKey
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public bool isValid()
        {
            return RowKey != null && RowKey.Length > 0 && PartitionKey != null && PartitionKey.Length > 0;
        }
    }
}
