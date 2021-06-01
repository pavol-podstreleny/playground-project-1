using System;
using System.Threading.Tasks;
using CustomerAPI.Model;
using CustomerAPI.services;
using CustomerAPI.DataStores.TableDataStore;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CustomerAPI.Controllers
{

    [ApiController]
    [Route("api/v1/customers")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService CustomerService)
        {
            this._customerService = CustomerService;
        }

        [HttpPost]
        public async Task<ActionResult<ICustomer>> CreateCustomer([FromBody] Customer customer)
        {

            // Create unique customer ID
            // TODO create maybe customer service to generate GUI
            customer.ID = System.Guid.NewGuid().ToString();

            ICustomer createdCustomer = await this._customerService.CreateCustomer(customer);
            return Ok(createdCustomer);
        }

        [HttpGet("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<ICustomer>> GetCustomer(string rowKey, string partitionKey){
            ICustomer customer = await this._customerService.GetCustomer(new TableKey(){ PartitionKey = partitionKey, RowKey = rowKey});
            if (customer == null)
                return NotFound();
            return Ok(customer);
        }

        [HttpPatch("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<ICustomer>> UpdateCustomer(string rowKey, string partitionKey, [FromBody] CustomerForm customerForm){
            if(customerForm.isNullable()) {
                return BadRequest();
            }
            Customer customer = new Customer() {
                Age = customerForm.Age,
                City = customerForm.City,
                Email = customerForm.Email,
                FirstName = customerForm.FirstName,
                LastName = customerForm.LastName,
                PostalCode = customerForm.PostalCode,
                ID = rowKey,
                PartialID = partitionKey
            };
            ICustomer updatedCustomer = await this._customerService.UpdateCustomer(customer,new TableKey(){RowKey = rowKey, PartitionKey = partitionKey});
            if(updatedCustomer == null)
                return NotFound();
            return Ok(updatedCustomer);
        }


        public class CustomerForm {
            
            [StringLength(20, MinimumLength = 2)]
            public string FirstName { get; set; }

            [StringLength(20, MinimumLength = 2)]
            public string LastName { get; set; }

            [EmailAddress]
            [StringLength(5,MinimumLength =3 )]
            public string Email { get; set; }

            [RegularExpression(
                @"^[0-9]{5}(?:-[0-9]{4})?$",
                ErrorMessage = "Please Provide Postal Code in correct format")
            ]
            public string PostalCode { get; set; }

            [Range(0, 150)]
            public byte? Age { get; set; }

            [StringLength(50, MinimumLength = 2)]
            public string City { get; set; }

            public bool isNullable(){
                return this.LastName == null && this.FirstName == null && this.Email == null && this.PostalCode == null && this.Age == null && this.City == null;
            }

        }

    }
}
