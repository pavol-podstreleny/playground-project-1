using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace CustomerAPI.Exceptions.Filters
{
    public class HandleCustomerException : TypeFilterAttribute
    {

        public HandleCustomerException() : base(typeof(CustomerExceptionFilter))
        {

        }

    }
}
