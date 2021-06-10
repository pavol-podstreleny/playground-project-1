using Microsoft.Azure.Cosmos.Table;
using System;

namespace CustomerAPI.Model
{
    public class CustomerEntity : TableEntity
    {

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Age { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }

    }
}