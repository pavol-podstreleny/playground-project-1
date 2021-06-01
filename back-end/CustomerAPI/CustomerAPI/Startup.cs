using System;
using CustomerAPI.DataStores.Common;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Model;
using CustomerAPI.repositories;
using CustomerAPI.services;
using CustomerAPI.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace CustomerAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            services.AddScoped<CloudTableClient>(provider =>
            {
                return CloudTableClientProvider.CreateTableClient(new StorageTableConnectionConfig()
                {
                    DefaultEndpointsProtocol = Configuration.GetSection("StorageTableConnection")["DefaultEndpointsProtocol"],
                    AccountKey = Configuration.GetSection("StorageTableConnection")["AccountKey"],
                    TableEndpoint = Configuration.GetSection("StorageTableConnection")["TableEndpoint"]
                });
            });
            services.AddSingleton<CustomerMapper>();
            services.AddScoped<CustomerTableDataStore>();
            services.AddScoped<ICRUDDataStoreAsync<ICustomer, TableKey>, CustomerTableDataStore>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<ICustomerService, CustomerService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
