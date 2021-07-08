using CustomerApi.Model;
using CustomerApi.Utils;
using CustomerAPI.DataStores.Common;
using CustomerAPI.DataStores.TableDataStore;
using CustomerAPI.Exceptions.Filters;
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
using Prometheus;

namespace CustomerAPI
{
    public class Startup
    {

        readonly string localLostOrigin = "_localOrigin";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
                {
                    options.AddPolicy(name: localLostOrigin, builder =>
                    {
                        builder.WithOrigins(new string[1] { "http://localhost:3000" });
                    });
                });
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
            services.AddTransient<TableStorageExceptionFilter>();
            services.AddTransient<CustomerExceptionFilter>();

            services.AddScoped<IMapper<CustomerDTO, CustomerEntity>, CustomerDTOtoEntityMapper>();
            services.AddScoped<IOneWayMapper<CustomerForm, CustomerEntity>, CustomerFormToEntityMapper>();
            services.AddScoped<TableDataStore<CustomerEntity>, CustomerTableDataStore>();
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
            app.UseCors(localLostOrigin);
            app.UseHttpMetrics();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapMetrics();
            });
        }
    }
}
