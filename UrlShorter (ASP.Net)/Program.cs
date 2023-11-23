namespace UrlShorter
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddOpenApiDocument(options => options.PostProcess = doc => {
                doc.Info = new NSwag.OpenApiInfo { Title = "UrlShorter Routes Documentation" };
            });//Title for OpenAPI

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
