using Microsoft.EntityFrameworkCore;
using UrlShorter.Database;

namespace UrlShorter.Services.Link
{
    public class LinkService : ILinkService
    {
        private readonly ApplicationContext context;
        public LinkService(ApplicationContext context) => this.context = context;
        public async Task<LinkModels.Link> CreateLink(string realUrl)
        {
            var obj = await context.Links.AddAsync(new()
            {
                DestinationUrl = realUrl,
                ShortUrl = GetLinkHash()
            });
            return obj.Entity.MapToServiceModel();
        }

        public Task<LinkModels.Link[]> GetAllLinks()
        {
            return Task.Run(() =>
            {
                return context.Links.ToArray().Select(x => x.MapToServiceModel()).ToArray();
            });
        }

        public async Task<LinkModels.Link?> GetLinkById(int id)
        {
            return (await context.Links.FirstOrDefaultAsync(x => id == x.Id))?.MapToServiceModel();
        }

        public Task<LinkModels.Link?> ModifyLink(int id, string realUrl, bool resetCounter = false)
        {
            throw new NotImplementedException();
        }

        public bool RemoveLinkById(int id)
        {
            throw new NotImplementedException();
        }

        private string GetLinkHash()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
