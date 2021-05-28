using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Model
{
    public class CustomerEntity : TableEntity
    {
        public CustomerEntity(
            string Email, 
            string PostalCode)
        {
            RowKey = Email;
            PartitionKey = PostalCode;
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte Age { get; set; }
        public string City { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
