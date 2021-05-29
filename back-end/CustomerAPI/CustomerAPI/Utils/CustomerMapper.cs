using CustomerAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Utils
{
    public class CustomerMapper : Mapper<ICustomer, CustomerEntity>
    {
        public CustomerEntity Map(ICustomer entity)
        {
            return new CustomerEntity(entity.PostalCode, entity.ID)
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Age = entity.Age,
                City = entity.City,
            };
        }

        public ICustomer Map(CustomerEntity entity)
        {
            return entity;
        }
    }
}
