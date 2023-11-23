using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using UrlShorter.Database;

namespace UrlShorter.Services.LinkGenerator
{
    public partial class LinkGeneratorService : ILinkGeneratorService
    {
        private readonly RepositoryService context;
        private readonly LinkGeneratorOptions options = new();

        public LinkGeneratorService(RepositoryService context, IConfiguration? configuration)
        {
            this.context = context;
            if(configuration == null)
            {
                options.MinLength = 8;
            }else configuration.GetSection(LinkGeneratorOptions.Position).Bind(options);
        }
        private int generationAttempts = 0;
        public async Task<string> GetUniquePath()
        {
            generationAttempts++;
            var hash = GetRandomUID();
            if (await context.Links.FirstOrDefaultAsync(x => x.ShortUrl == hash) != null)
            {
                if (generationAttempts > 10)
                {
                    throw new IndexOutOfRangeException(nameof(generationAttempts));
                }
                return await GetUniquePath();
            }
            return hash;
        }
        private string GetRandomUID()
        {
            return Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "").Substring(0, options.MinLength);
        }
    }
}
