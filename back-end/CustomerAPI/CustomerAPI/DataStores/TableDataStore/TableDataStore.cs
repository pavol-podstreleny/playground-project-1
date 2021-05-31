using CustomerAPI.DataStores.Common;
using CustomerAPI.Utils;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerAPI.DataStores.TableDataStore
{
    public abstract class TableDataStore<ENTITY, TABLE_ENTITY> : ICRUDDataStoreAsync<ENTITY, TableKey> where TABLE_ENTITY : TableEntity
    {
        private readonly CloudTable _table;
        private readonly Mapper<ENTITY, TABLE_ENTITY> _mapper;

        public TableDataStore(CloudTableClient Tableclient, Mapper<ENTITY, TABLE_ENTITY> Mapper, String TableName)
        {
            CloudTable table = Tableclient.GetTableReference(TableName);
            table.CreateIfNotExistsAsync();
            _table = table;
            _mapper = Mapper;
        }

        public async Task<ENTITY> Create(ENTITY entity)
        {
            IsEntityNullable(entity);
            return await ExecuteAsyncQueryAndMapResult(entity, TableOperation.Insert);
        }

        public async Task<ENTITY> Read(TableKey id)
        {

            return await ExecuteAsyncQueryAndMapResult(id, TableOperation.Retrieve<TABLE_ENTITY>);
        }

        public async void Delete(TableKey id)
        {
            ENTITY entity = await Read(id);
            IsEntityNullable(entity);
            await ExecuteAsyncQueryAndMapResult(entity, TableOperation.Delete);
        }

        public async Task<ENTITY> Update(ENTITY entity, TableKey key)
        {
            IsEntityNullable(entity);
            return await ExecuteAsyncQueryAndMapResult(entity, TableOperation.Merge);
        }

        public Task<IEnumerable<ENTITY>> ReadAll()
        {
            throw new NotImplementedException();
        }

        private void IsEntityNullable(ENTITY entity)
        {
            if (entity == null)
            {
                // TOOD provide loging
                throw new ArgumentNullException($"{nameof(entity)} cannot be null");
            }
        }

        private async Task<ENTITY> ExecuteAsyncQueryAndMapResult(TableKey id, Func<string, string, List<string>, TableOperation> operation, List<string> attributes = null)
        {
            try
            {
                TableOperation tableOperation = operation(id.PartitionKey, id.RowKey, attributes);
                TableResult tableResult = await _table.ExecuteAsync(tableOperation);
                TABLE_ENTITY resultEntity = tableResult.Result as TABLE_ENTITY;
                return _mapper.Map(resultEntity);
            }
            catch (StorageException e)
            {
                throw e;
            }
        }
        private async Task<ENTITY> ExecuteAsyncQueryAndMapResult(ENTITY entity, Func<ITableEntity, TableOperation> operation)
        {
            try
            {
                TABLE_ENTITY mappedEntity = _mapper.Map(entity);
                TableOperation tableOperation = operation(mappedEntity);
                TableResult tableResult = await _table.ExecuteAsync(tableOperation);
                TABLE_ENTITY resultEntity = tableResult.Result as TABLE_ENTITY;
                return _mapper.Map(resultEntity);
            }
            catch (StorageException e)
            {
                // TODO implement logging
                throw e;
            }
        }

    }
}
