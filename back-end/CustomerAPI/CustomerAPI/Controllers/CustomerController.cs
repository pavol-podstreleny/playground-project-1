using System.Linq;
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
using CustomerAPI.Exceptions.Filters;

namespace CustomerAPI.Controllers
{

    [ApiController]
    [Route("api/v1/customers")]
    [TableStorageExceptionHandler]
    [HandleCustomerException]
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
            return Ok(customers);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> CreateCustomer([FromBody] CustomerDTO customerDTO)
        {
            CustomerEntity customer = await this._customerService.CreateCustomer(_mapperDtoToEntity.Map(customerDTO));
            return Created($"/api/v1/customers/{customer.RowKey}/{customer.PartitionKey}", customer);
        }

        [HttpGet("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomer(string rowKey, string partitionKey)
        {
            CustomerEntity customer = await this._customerService.GetCustomer(new TableKey() { PartitionKey = partitionKey, RowKey = rowKey });
            return Ok(_mapperDtoToEntity.Map(customer));
        }

        [HttpPatch("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<CustomerEntity>> UpdateCustomer(string rowKey, string partitionKey, [FromBody] CustomerForm customerForm)
        {
            if (customerForm.isNullable())
            {
                _logger.LogWarning("Client did not specified correct body");
                return BadRequest();
            }

            CustomerEntity customer = _mapperFormToEntity.Map(customerForm);
            await this._customerService.UpdateCustomer(customer, new TableKey() { RowKey = rowKey, PartitionKey = partitionKey });
            return NoContent();
        }

        [HttpDelete("{rowKey}/{partitionKey}")]
        public async Task<IActionResult> DeleteCustomer(string rowKey, string partitionKey)
        {
            await this._customerService.DeleteCustomer(new TableKey() { RowKey = rowKey, PartitionKey = partitionKey });
            _logger.LogInformation("Customer with RowKey: {0} and PartitionKey: {1} successfully deleted", rowKey, partitionKey);
            return NoContent();
        }

    }
}
