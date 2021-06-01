using System;
using System.Threading.Tasks;
using CustomerAPI.Model;
using CustomerAPI.services;
using CustomerAPI.DataStores.TableDataStore;
using Microsoft.AspNetCore.Mvc;
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

        

        

    }
}
