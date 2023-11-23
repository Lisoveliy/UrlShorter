using Microsoft.EntityFrameworkCore;
using UrlShorter.Database;

namespace UrlShorter.Services.Redirect
{
    public class RedirectService : IRedirectService
    {
        private readonly RepositoryService databaseService;
        public RedirectService(RepositoryService databaseService) => this.databaseService = databaseService;

        public async Task<string?> GetRedirectURL(string hash)
        {
            var res = await databaseService.Links.FirstOrDefaultAsync(x => hash == x.ShortUrl);
            if (res == null)
            {
                return null;
            }
            res.TransitionCount++;
            databaseService.Links.Update(res);
            await databaseService.SaveChangesAsync();
            return res.DestinationUrl;
        }
    }
}
