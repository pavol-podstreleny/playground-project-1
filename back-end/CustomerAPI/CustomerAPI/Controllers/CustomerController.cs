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
            _logger.LogInformation("Fetching all customers...");
            IEnumerable<CustomerEntity> customers = await this._customerService.GetCustomers();
            if (customers == null)
            {
                _logger.LogWarning("No customers founded");
                return NotFound();
            }
            _logger.LogInformation("Successfully fetched {0} customers.", customers.Count());
            return Ok(customers);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> CreateCustomer([FromBody] CustomerDTO customerDTO)
        {
            _logger.LogInformation("Creating a new Customer...");
            CustomerEntity customer = await this._customerService.CreateCustomer(_mapperDtoToEntity.Map(customerDTO));
            _logger.LogInformation("Custommer with RowKey: {0} AND PartitionKey: {1} successfully created.", customer.RowKey, customer.PartitionKey);
            return Created($"/api/v1/customers/{customer.RowKey}/{customer.PartitionKey}", customer);
        }

        [HttpGet("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomer(string rowKey, string partitionKey)
        {
            _logger.LogInformation("Fetching user with RowKey: {0} AND PartitionKey: {1} ...", rowKey, partitionKey);
            CustomerEntity customer = await this._customerService.GetCustomer(new TableKey() { PartitionKey = partitionKey, RowKey = rowKey });
            if (customer == null)
            {
                _logger.LogWarning("No customer with RowKey: {0} AND PartitionKey: {1} exists", rowKey, partitionKey);
                return NotFound();
            }
            _logger.LogInformation("Customer with RowKey: {0} AND PartitionKey: {1} successfully fetched", rowKey, partitionKey);
            return Ok(_mapperDtoToEntity.Map(customer));
        }

        [HttpPatch("{rowKey}/{partitionKey}")]
        public async Task<ActionResult<CustomerEntity>> UpdateCustomer(string rowKey, string partitionKey, [FromBody] CustomerForm customerForm)
        {
            _logger.LogInformation("Patching customer with RowKey: {0} AND PartitionKey: {1} ...", rowKey, partitionKey);
            if (customerForm.isNullable())
            {
                _logger.LogWarning("Client did not specified correct body");
                return BadRequest();
            }

            CustomerEntity customer = _mapperFormToEntity.Map(customerForm);
            CustomerEntity updatedCustomer = await this._customerService.UpdateCustomer(customer, new TableKey() { RowKey = rowKey, PartitionKey = partitionKey });
            if (updatedCustomer == null)
            {
                _logger.LogWarning("Customer with RowKey: {0} AND PartitionKey: {1} cannot be patched because he/she does not exist");
                return NotFound();
            }
            _logger.LogInformation("Customer with RowKey: {0} AND PartitionKey: {1} succesfully updated");
            return NoContent();
        }

        [HttpDelete("{rowKey}/{partitionKey}")]
        public async Task<IActionResult> DeleteCustomer(string rowKey, string partitionKey)
        {
            _logger.LogInformation("Starting deletion of customer with RowKey: {0} AND PartitionKey: {1} ...", rowKey, partitionKey);
            await this._customerService.DeleteCustomer(new TableKey() { RowKey = rowKey, PartitionKey = partitionKey });
            _logger.LogInformation("Customer with RowKey: {0} and PartitionKey: {1} successfully deleted", rowKey, partitionKey);
            return NoContent();
        }

    }
}
