using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace CustomerAPI.Exceptions.Filters
{
    public class CustomerExceptionFilter : IExceptionFilter
    {

        private readonly ILogger<CustomerExceptionFilter> _logger;

        public CustomerExceptionFilter(ILogger<CustomerExceptionFilter> logger)
        {
            this._logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            if (context.Exception is CustomerNotExistsException)
            {
                _logger.LogWarning(context.Exception.Message);
                var error = new ProblemDetails
                {
                    Status = 404,
                    Title = "Customer not found",
                    Detail = context.Exception.Message,
                    Type = "https://httpstatus.com/404-not-found/"
                };
                context.Result = new ObjectResult(error)
                {
                    StatusCode = 404
                };
                context.ExceptionHandled = true;
            }
        }
    }
}
