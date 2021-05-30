using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Model
{
    public class CustomerEntity : TableEntity, ICustomer
    {
        public CustomerEntity(
            string PostalCode,
            string GUID
            )
        {
            RowKey = GUID;
            PartitionKey = PostalCode;

            this.PostalCode = PostalCode;
            this.PartialID = PostalCode;
            this.ID = GUID;
        }

        public string PartialID { get; set; }
        public string ID { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte Age { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
    }
}
