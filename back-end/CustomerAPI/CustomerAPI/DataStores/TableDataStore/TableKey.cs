namespace CustomerAPI.DataStores.TableDataStore
{
    public class TableKey
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public bool isValid()
        {
            return RowKey != null && RowKey.Length > 0 && PartitionKey != null && PartitionKey.Length > 0;
        }
    }
}
