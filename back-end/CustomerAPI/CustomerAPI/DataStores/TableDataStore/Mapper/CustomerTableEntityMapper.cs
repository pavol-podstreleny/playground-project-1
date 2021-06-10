using System;
using System.Collections.Generic;
using CustomerAPI.Model;
using Microsoft.Azure.Cosmos.Table;

namespace CustomerAPI.DataStores.TableDataStore.Mapper
{
    public class CustomerTableEntityMapper : ITableEntityMapper<ICustomer>
    {
        public ICustomer Map(string partitionKey, string rowKey, DateTimeOffset timestamp, IDictionary<string, EntityProperty> properties, string etag)
        {
            var customer = new Customer();
            if(properties.ContainsKey(nameof(customer.Age))){
                customer.Age = (Byte) properties[nameof(customer.Age)].Int32Value;
            }
            if(properties.ContainsKey(nameof(customer.FirstName))){
                customer.FirstName = properties[nameof(customer.FirstName)].StringValue;
            }
            return customer;   
            
        }
    }
}