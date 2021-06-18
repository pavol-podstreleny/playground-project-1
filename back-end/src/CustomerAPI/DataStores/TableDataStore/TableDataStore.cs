using CustomerAPI.DataStores.Common;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CustomerAPI.DataStores.TableDataStore
{
    public abstract class TableDataStore<TABLE_ENTITY> : ICRUDDataStoreAsync<TABLE_ENTITY, TableKey> where TABLE_ENTITY : TableEntity, new()
    {
        private readonly CloudTable _table;

        public TableDataStore(CloudTableClient Tableclient, String TableName)
        {
            CloudTable table = Tableclient.GetTableReference(TableName);
            table.CreateIfNotExistsAsync();
            _table = table;
        }

        public async Task<TABLE_ENTITY> Create(TABLE_ENTITY entity)
        {
            IsEntityNullable(entity);
            return await ExecuteAsyncQueryAndMapResult(entity, TableOperation.Insert);
        }

        public async Task<TABLE_ENTITY> Read(TableKey id)
        {
            return await ExecuteAsyncQueryAndMapResult(id, TableOperation.Retrieve<TABLE_ENTITY>);
        }

        public async Task Delete(TableKey key)
        {
            TABLE_ENTITY entity = await Read(key);
            await ExecuteAsyncQueryAndMapResult(entity, TableOperation.Delete);
        }

        public async Task<TABLE_ENTITY> Update(TABLE_ENTITY entity, TableKey key)
        {
            IsEntityNullable(entity, key);
            return await ExecuteAsyncQueryAndMapResult(entity, TableOperation.Merge, key);
        }

        public async Task<IEnumerable<TABLE_ENTITY>> ReadAll()
        {
            TableQuery<TABLE_ENTITY> query = new TableQuery<TABLE_ENTITY>();
            var continuationToken = new TableContinuationToken();
            var tableQuerySegment = await _table.ExecuteQuerySegmentedAsync<TABLE_ENTITY>(query, continuationToken);
            return tableQuerySegment.Results;
        }

        protected abstract void HandleNullableEntity(TableKey key);

        private void IsEntityNullable(TABLE_ENTITY entity, TableKey key = null)
        {
            if (entity == null)
            {
                // TOOD provide loging
                HandleNullableEntity(key);
            }
        }

        private async Task<TABLE_ENTITY> ExecuteAsyncQueryAndMapResult(TableKey id, Func<string, string, List<string>, TableOperation> operation, List<string> attributes = null)
        {
            TableOperation tableOperation = operation(id.PartitionKey, id.RowKey, attributes);
            TableResult tableResult = await _table.ExecuteAsync(tableOperation);
            TABLE_ENTITY resultEntity = tableResult.Result as TABLE_ENTITY;
            IsEntityNullable(resultEntity, id);
            return resultEntity;
        }

        private async Task<TABLE_ENTITY> ExecuteAsyncQueryAndMapResult(TABLE_ENTITY entity, Func<ITableEntity, TableOperation> operation, TableKey key = null)
        {
            if (key != null && key.isValid())
            {
                entity.RowKey = key.RowKey;
                entity.PartitionKey = key.PartitionKey;
            }
            TableOperation tableOperation = operation(entity);
            TableResult tableResult = await _table.ExecuteAsync(tableOperation);
            TABLE_ENTITY resultEntity = tableResult.Result as TABLE_ENTITY;
            IsEntityNullable(resultEntity, key);
            return resultEntity;
        }

    }
}
