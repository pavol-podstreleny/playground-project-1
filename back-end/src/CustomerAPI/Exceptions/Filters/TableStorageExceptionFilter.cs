using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CustomerAPI.Exceptions.Filters
{
    public class TableStorageExceptionFilter : IExceptionFilter
    {

        private readonly IWebHostEnvironment _env;
        private readonly ILogger<TableStorageExceptionFilter> _logger;

        public TableStorageExceptionFilter(IWebHostEnvironment env, ILogger<TableStorageExceptionFilter> logger)
        {
            _env = env;
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {

            if (context.Exception is StorageException)
            {
                _logger.LogError(context.Exception, context.Exception.Message);
                ProblemDetails error = new ProblemDetails();
                if (_env.IsDevelopment())
                {
                    error.Title = "Problem with table storage occured";
                    error.Detail = context.Exception.Message;
                    error.Status = 503;
                }
                context.Result = new ObjectResult(error)
                {
                    StatusCode = 503
                };
                context.ExceptionHandled = true;
            }
        }
    }
}
