using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Model
{
    public interface ICustomer
    {
        public string ID { get; set; }
        public string PartialID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PostalCode { get; set; }
        public byte Age { get; set; }
        public string City { get; set; }
    }
}
