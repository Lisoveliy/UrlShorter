using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Text.RegularExpressions;
using UrlShorter.Database;
using UrlShorter.Mappers;
using UrlShorter.Services.LinkGenerator;

namespace UrlShorter.Services.Link
{
    public class LinkService : ILinkService
    {
        private readonly RepositoryService context;
        private readonly ILinkGeneratorService generatorService;
        public LinkService(RepositoryService context, ILinkGeneratorService linkGenerator)
        {
            this.context = context;
            this.generatorService = linkGenerator;
        }
        public async Task<LinkModels.Link?> CreateLink(string realUrl)
        {
            var existingRoute = await context.Links.FirstOrDefaultAsync(x => realUrl == x.DestinationUrl);
            if (existingRoute != null)
            {
                return null;
            }
            var obj = await context.Links.AddAsync(new()
            {
                DestinationUrl = realUrl,
                ShortUrl = await generatorService.GetUniquePath()
            });
            await context.SaveChangesAsync();
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

        public async Task<(LinkModels.Link?, bool)> ModifyLink(int id, string realUrl, bool resetCounter = false)
        {
            var link = await context.Links.FindAsync(id);
            if(link == null)
            {   //link not found
                return (null, false);
            }
            var existingRoute = await context.Links.FirstOrDefaultAsync(x => realUrl == x.DestinationUrl);
            if (existingRoute != null)
            {
                return (null, true);
            }
            link.DestinationUrl = realUrl;
            link.TransitionCount = resetCounter ? 0 : link.TransitionCount;
            var entity = context.Links.Update(link); //Return updated link
            await context.SaveChangesAsync();
            return (entity.Entity.Map<LinkModels.Link>(), false);

        }

        public async Task<bool> RemoveLinkById(int id)
        {
            var delentity = await context.Links.FindAsync(id);
            if (delentity != null)
            {
                context.Links.Remove(delentity);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
