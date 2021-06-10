using CustomerAPI.Utils;


namespace CustomerAPI.Model
{
    public class CustomerDTOtoEntityMapper : IMapper<CustomerDTO, CustomerEntity>
    {
        public CustomerEntity Map(CustomerDTO entity)
        {
            return new CustomerEntity()
            {
                PartitionKey = entity.PartitionKey,
                RowKey = entity.RowKey,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Age = entity.Age,
                City = entity.City,
                PostalCode = entity.PostalCode,
            };

        }

        public CustomerDTO Map(CustomerEntity entity)
        {
            return new CustomerDTO()
            {
                PartitionKey = entity.PartitionKey,
                RowKey = entity.RowKey,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Age = entity.Age,
                City = entity.City,
                PostalCode = entity.PostalCode
            };
        }
    }
}
