using System.Threading.Tasks;
using CustomerAPI.Model;
using CustomerAPI.services;
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
            await this._customerService.CreateCustomer(customer);
            return Ok();
        }

    }
}
