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
        public Services.Link.LinkModels.Link Map<T>()
        {
            if(typeof(T).IsAssignableFrom(typeof(Services.Link.LinkModels.Link)))
                return new(Id, DestinationUrl, ShortUrl, CreatedTime, TransitionCount);
            throw new InvalidCastException();
        }
    }
}