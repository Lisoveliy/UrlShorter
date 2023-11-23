namespace UrlShorter.Controllers.LinksDTO
{
    /// <summary>
    /// Link object
    /// </summary>
    /// <param name="id">Id of link</param>
    /// <param name="realUrl">Url to redirect</param>
    /// <param name="shortUrl">Url from redirect</param>
    /// <param name="creationDate">Time from added to DB</param>
    /// <param name="countOfTransitions">Count of openning link</param>
    public record LinkDTO(
        int id,
        string realUrl,
        string shortUrl,
        DateTime creationDate,
        int countOfTransitions);
}
namespace UrlShorter.Mappers
{
    static partial class LinkMapper
    {
        public static Controllers.LinksDTO.LinkDTO Map<T>(this Services.Link.LinkModels.Link link)
        {
            if (typeof(T).IsAssignableFrom(typeof(Controllers.LinksDTO.LinkDTO)))
                return new(link.Id, link.DestinationUrl, link.GeneratedUrl, link.CreationDate, link.countOfTransitions);
            throw new InvalidCastException();
        }
    }
}