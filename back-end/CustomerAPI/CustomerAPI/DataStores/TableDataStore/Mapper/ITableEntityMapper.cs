using System;
using System.Collections.Generic;
using Microsoft.Azure.Cosmos.Table;

namespace CustomerAPI.DataStores.TableDataStore.Mapper
{
    public interface ITableEntityMapper<ENTITY> {
        ENTITY Map(string partitionKey, string rowKey, DateTimeOffset timestamp, IDictionary<string,EntityProperty> properties, string etag);
    }
    
}