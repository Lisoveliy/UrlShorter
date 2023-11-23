using Microsoft.EntityFrameworkCore;

namespace UrlShorter.Database.Entities
{
    public class Link
    {
        public int Id { get; set; }
        public string DestinationUrl { get; set; } = null!;
        public string ShortUrl { get; set; } = null!;
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        public int TransitionCount { get; set; }
        public Services.Link.LinkModels.Link MapToServiceModel()
        {
            return new(Id, DestinationUrl, ShortUrl, CreatedTime, TransitionCount);
        }
    }
}