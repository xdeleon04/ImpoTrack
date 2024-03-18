namespace ImpoTrack.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                IConfiguration config;
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                var confBuilder = new ConfigurationBuilder()
                    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                    .AddEnvironmentVariables();

                if (env == "Development")
                {
                    confBuilder.AddUserSecrets<AppDbContext>();
                }

                config = confBuilder.Build();

                string? connectionString = config.GetConnectionString("DefaultConnection");

                if (!string.IsNullOrEmpty(connectionString))
                {
                    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
                }
                else
                {
                    throw new Exception("No connection string found in secrets.json or environment variables");
                }

            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseExceptionHandler("/error");
                app.MapGet("/error", () => Results.Problem("Ocurrió un error", statusCode: 500));
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapGet("/contribuyentes", async (AppDbContext db) =>
                await db.Contribuyentes.ToListAsync())
            .WithName("GetContribuyentes")
            .WithOpenApi()
            .WithHttpLogging(Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.All);

            app.MapGet("/comprobantes", async (AppDbContext db) =>
            {
                return await db.ComprobantesFiscales.ToListAsync();
            })
            .WithName("GetComprobantes")
            .WithOpenApi()
            .WithHttpLogging(Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.All);

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}