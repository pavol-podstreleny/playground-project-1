using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Utils
{
    public class StorageTableConnectionConfig
    {
        public string DefaultEndpointsProtocol { get; set; }
        public string AccountKey { get; set; }
        public string TableEndpoint { get; set; }

        public string GetConnectionString()
        {
            return $"{DefaultEndpointsProtocol};{AccountKey};{TableEndpoint};";
        }

    }
}
