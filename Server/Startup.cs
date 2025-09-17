using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using Server;
using Server.Services;

public class Startup
{
    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        // Bind settings from appsettings.json (ConnectionStrings section)
        var mongoSettings = new MongoDbSettings
        {
            ConnectionString = Configuration["ConnectionStrings:MongoDb"],
            DatabaseName = Configuration["ConnectionStrings:DatabaseName"]
        };

        // Register MongoDbSettings for DI
        services.AddSingleton(mongoSettings);

        // Register Mongo client as singleton
        services.AddSingleton<IMongoClient>(s =>
            new MongoClient(mongoSettings.ConnectionString));

        services.AddSingleton<MongoService>();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp",
                builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseCors("AllowReactApp");

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}