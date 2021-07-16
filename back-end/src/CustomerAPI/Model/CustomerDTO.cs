using System;
using System.ComponentModel.DataAnnotations;

namespace CustomerAPI.Model
{
    public class CustomerDTO
    {

        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        [StringLength(20, MinimumLength = 2)]
        [Required]
        public string FirstName { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 2)]
        public string LastName { get; set; }

        [EmailAddress]
        [StringLength(50)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(
            @"^[0-9]{5}(?:-[0-9]{4})?$",
            ErrorMessage = "Please Provide Postal Code in correct format")
        ]
        public string PostalCode { get; set; }

        [Range(0, 150)]
        [Required]
        public int? Age { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string City { get; set; }

    }
}
