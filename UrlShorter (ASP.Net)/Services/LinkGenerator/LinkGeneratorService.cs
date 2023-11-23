using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using UrlShorter.Database;

namespace UrlShorter.Services.LinkGenerator
{
    public class LinkGeneratorService : ILinkGeneratorService
    {
        private readonly DatabaseService context;
        //private readonly IConfiguration configuration;
        public LinkGeneratorService(DatabaseService service) => context = service;
        private int generationAttempts = 0;
        public async Task<string> GetUniquePath()
        {
            generationAttempts++;
            var hash = GetRandomUID();
            if (await context.Links.FirstOrDefaultAsync(x => x.ShortUrl == hash) != null)
            {
                if (generationAttempts == 10)
                {
                    throw new StackOverflowException();
                }
                return await GetUniquePath();
            }
            return hash;
        }
        private string GetRandomUID()
        {
            return Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "").Substring(0, 1);
        }
    }
}
