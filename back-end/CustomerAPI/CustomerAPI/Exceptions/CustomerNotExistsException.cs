using System;

namespace CustomerAPI.Exceptions
{
    public class CustomerNotExistsException : Exception
    {
        public CustomerNotExistsException(string message) : base(message)
        {

        }
    }
}