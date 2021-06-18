using CustomerApi.Model;
using CustomerApi.Utils;


namespace CustomerAPI.Model
{
    public class CustomerFormToEntityMapper : IOneWayMapper<CustomerForm, CustomerEntity>
    {
        public CustomerEntity Map(CustomerForm entity)
        {
            return new CustomerEntity()
            {
                Age = entity.Age,
                City = entity.City,
                Email = entity.Email,
                ETag = "*",
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                PostalCode = entity.PostalCode
            };
        }
    }
}
