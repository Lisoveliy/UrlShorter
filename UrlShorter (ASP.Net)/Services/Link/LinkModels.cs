namespace UrlShorter.Services.Link.LinkModels;

public record Link(
    int Id,
    string DestinationUrl,
    string GeneratedUrl,
    DateTime CreationDate,
    int countOfTransitions);
public static class LinkMapper
{
    public static Link Map<T>(this Database.Entities.Link link)
    {
        if (typeof(T).IsAssignableFrom(typeof(Services.Link.LinkModels.Link)))
            return new(link.Id, link.DestinationUrl, link.ShortUrl, link.CreatedTime, link.TransitionCount);
        throw new InvalidCastException();
    }
}