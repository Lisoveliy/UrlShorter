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
            return obj.Entity.Map<LinkModels.Link>();
        }

        public LinkModels.Link[] GetLinks(int offset, int count)
        {
            //Get with pagination sorted by id
            return context.Links
                .Skip(offset)
                .Take(count)
                .Select(x => x.Map<LinkModels.Link>()).ToArray();
        }

        public async Task<LinkModels.Link?> GetLinkById(int id)
        {
            return (await context.Links.FindAsync(id))?.Map<LinkModels.Link>();
        }

        public async Task<LinkModels.Link?> ModifyLink(int id, string realUrl, bool resetCounter = false)
        {
            var link = await context.Links.FindAsync(id);
            if(link == null)
            {   //link not found
                return null;
            }
            link.DestinationUrl = realUrl;
            link.TransitionCount = resetCounter ? 0 : link.TransitionCount;
            return context.Links.Update(link) //Return updated link
                .Entity.Map<LinkModels.Link>();

        }

        public async Task<bool> RemoveLinkById(int id)
        {
            var delentity = await context.Links.FindAsync(id);
            if (delentity != null)
            {
                context.Links.Remove(delentity);
                return true;
            }
            return false;
        }

        private string GetLinkHash()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
