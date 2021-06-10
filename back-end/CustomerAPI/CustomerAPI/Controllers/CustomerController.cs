using System;
using System.Threading.Tasks;
using CustomerAPI.Model;
using CustomerAPI.services;
using CustomerAPI.DataStores.TableDataStore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using CustomerAPI.Utils;
using CustomerApi.Model;
using CustomerApi.Utils;

namespace CustomerAPI.Controllers
{

    [ApiController]
    [Route("api/v1/customers")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly ILogger<CustomerController> _logger;
        private readonly IMapper<CustomerDTO, CustomerEntity> _mapperDtoToEntity;
        private readonly IOneWayMapper<CustomerForm, CustomerEntity> _mapperFormToEntity;

        public CustomerController(
            ICustomerService customerService,
            ILogger<CustomerController> logger,
            IMapper<CustomerDTO, CustomerEntity> mapperDtoToEntity,
            IOneWayMapper<CustomerForm, CustomerEntity> mapperFormToEntity
            )
        {
            this._customerService = customerService;
            this._logger = logger;
            this._mapperDtoToEntity = mapperDtoToEntity;
            this._mapperFormToEntity = mapperFormToEntity;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetAllCustomers()
        {
            IEnumerable<CustomerEntity> customers = await this._customerService.GetCustomers();
            if (customers == null)
            {
                return NotFound();
            }
            return Ok(customers);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> CreateCustomer([FromBody] CustomerDTO customer)
        {

            customer.RowKey = System.Guid.NewGuid().ToString();
            customer.PartitionKey = customer.PostalCode;

            CustomerEntity createdCustomer = await this._customerService.CreateCustomer(_mapperDtoToEntity.Map(customer));
            return Created($"api/v1/customers/{createdCustomer.RowKey}/{createdCustomer.PartitionKey}", createdCustomer);
        }

        [HttpGet("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomer(string rowKey, string partitionKey)
        {
            CustomerEntity customer = await this._customerService.GetCustomer(new TableKey() { PartitionKey = partitionKey, RowKey = rowKey });
            if (customer == null)
                return NotFound();
            return Ok(_mapperDtoToEntity.Map(customer));
        }

        [HttpPatch("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<CustomerEntity>> UpdateCustomer(string rowKey, string partitionKey, [FromBody] CustomerForm customerForm)
        {
            if (customerForm.isNullable())
            {
                return BadRequest();
            }

            CustomerEntity customer = _mapperFormToEntity.Map(customerForm);
            CustomerEntity updatedCustomer = await this._customerService.UpdateCustomer(customer, new TableKey() { RowKey = rowKey, PartitionKey = partitionKey });
            if (updatedCustomer == null)
                return NotFound();
            return NoContent();
        }

        [HttpDelete("{rowKey}/{partitionKey}")]
        public async Task<IActionResult> DeleteCustomer(string rowKey, string partitionKey)
        {
            await this._customerService.DeleteCustomer(new TableKey() { RowKey = rowKey, PartitionKey = partitionKey });
            return NoContent();
        }

    }
}
