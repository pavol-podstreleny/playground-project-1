using CustomerAPI.Model;
using CustomerAPI.services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Controllers
{

    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService CustomerService)
        {
            this._customerService = CustomerService;
        }


        [HttpGet]
        public ActionResult<Customer> GetAllCustomers()
        {
            IEnumerable<Customer> customers = _customerService.GetAllCustomers();
            return Ok(customers);
        }

    }
}
