using System;
using System.ComponentModel.DataAnnotations;

namespace CustomerApi.Model
{
    public class CustomerForm
    {

        [StringLength(20, MinimumLength = 2)]
        public string FirstName { get; set; }

        [StringLength(20, MinimumLength = 2)]
        public string LastName { get; set; }

        [EmailAddress]
        [StringLength(5, MinimumLength = 3)]
        public string Email { get; set; }

        [RegularExpression(
            @"^[0-9]{5}(?:-[0-9]{4})?$",
            ErrorMessage = "Please Provide Postal Code in correct format")
        ]
        public string PostalCode { get; set; }

        [Range(0, 150)]
        public int? Age { get; set; }

        [StringLength(50, MinimumLength = 2)]
        public string City { get; set; }

        public bool isNullable()
        {
            return this.LastName == null && this.FirstName == null && this.Email == null && this.PostalCode == null && this.Age == null && this.City == null;
        }

    }
}