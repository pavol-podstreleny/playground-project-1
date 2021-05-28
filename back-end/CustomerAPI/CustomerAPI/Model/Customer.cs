using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Model
{
    public class Customer
    {

        [StringLength(20, MinimumLength = 2)]
        [Required]
        public string FirstName { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 2)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(5,MinimumLength =3 )]
        public string Email { get; set; }

        [Required]
        [RegularExpression(
            @"^[0-9]{5}(?:-[0-9]{4})?$",
            ErrorMessage = "Please Provide Postal Code in correct format")
        ]
        public string PostalCode { get; set; }

        [Range(1, 100)]
        [Required]
        public byte Age { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string City { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
