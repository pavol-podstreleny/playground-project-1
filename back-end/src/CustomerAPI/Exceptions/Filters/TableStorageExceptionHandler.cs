using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Azure.Cosmos.Table;

namespace CustomerAPI.Exceptions.Filters
{
    public class TableStorageExceptionHandler : TypeFilterAttribute
    {

        public TableStorageExceptionHandler() : base(typeof(TableStorageExceptionFilter))
        {

        }
    }
}
