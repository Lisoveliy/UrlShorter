using Microsoft.EntityFrameworkCore;
using UrlShorter.Database;
using UrlShorter.Services.Link;
using UrlShorter.Services.LinkGenerator;
using UrlShorter.Services.Redirect;

namespace UrlShorter
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<RepositoryService>(x => x.UseMySQL(builder.Configuration.GetConnectionString("mysql")!));
            
            builder.Services.AddControllers();
            
            builder.Services.AddScoped<ILinkService, LinkService>();
            builder.Services.AddScoped<IRedirectService, RedirectService>();
            builder.Services.AddScoped<ILinkGeneratorService, LinkGeneratorService>();

            builder.Services.AddOpenApiDocument(options => options.PostProcess = doc => {
                doc.Info = new NSwag.OpenApiInfo { Title = "UrlShorter Routes Documentation" };
            });
            //Title for OpenAPI

            var app = builder.Build();
            
            app.MapControllers();
            if (app.Environment.IsDevelopment())
            {
                app.UseOpenApi();
                app.UseSwaggerUi3(c =>
                {
                
                });
            }
            app.Run();
        }
    }
}
