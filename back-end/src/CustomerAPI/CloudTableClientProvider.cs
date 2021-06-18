using CustomerAPI.Utils;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI
{
    public class CloudTableClientProvider
    {

        public static CloudTableClient CreateTableClient(StorageTableConnectionConfig key)
        {
            // Retrieve storage account information from connection string.
            CloudStorageAccount storageAccount = CreateStorageAccountFromConnectionString(key.GetConnectionString());
            // Create a table client for interacting with the table service
            return storageAccount.CreateCloudTableClient(new TableClientConfiguration());
        }

        private static CloudStorageAccount CreateStorageAccountFromConnectionString(string key)
        {
            CloudStorageAccount storageAccount;
            try
            {
                storageAccount = CloudStorageAccount.Parse(key);
            }
            catch (FormatException)
            {
                // TODO Provide logging
                throw;
            }
            catch (ArgumentException)
            {
                // TODO Provide Logging
                throw;
            }

            return storageAccount;
        }
    }
}
