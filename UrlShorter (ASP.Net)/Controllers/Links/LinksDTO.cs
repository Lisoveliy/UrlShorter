using System.ComponentModel.DataAnnotations;
using UrlShorter.Controllers.Links;

namespace UrlShorter.Controllers.Links
{
    struct ValidationConsts
    {
        public const string RegexLinkValidation = @"^(http|https):\/\/.*$";
    }
    /// <summary>
    /// Returning link object
    /// </summary>
    /// <param name="id">Id of link</param>
    /// <param name="realUrl">Url to redirect</param>
    /// <param name="shortUrl">Url from redirect</param>
    /// <param name="creationDate">Time from added to DB</param>
    /// <param name="countOfTransitions">Count of openning link</param>
    public record LinkDTOResponse(
        int id,
        string realUrl,
        string shortUrl,
        DateTime creationDate,
        int countOfTransitions);
    /// <summary>
    /// Add link object
    /// </summary>
    /// <param name="realUrl">Link to reduction</param>
    public record AddUrlDTORequest(
        [RegularExpression(ValidationConsts.RegexLinkValidation)]
        string realUrl
        );
    /// <summary>
    /// Modify link object
    /// </summary>
    /// <param name="id">ID of modifying object</param>
    /// <param name="newlink">New link to reduction</param>
    /// <param name="resetcounter">Need to reset counter?</param>
    public record ModifyUrlDTORequest(int id, 
        [RegularExpression(ValidationConsts.RegexLinkValidation)] 
        string newlink, 
        bool resetcounter = false);
}
namespace UrlShorter.Mappers
{
    static partial class LinkMapper
    {
        public static LinkDTOResponse Map<T>(this Services.Link.LinkModels.Link link)
        {
            if (typeof(T).IsAssignableFrom(typeof(LinkDTOResponse)))
                return new(link.Id, link.DestinationUrl, link.GeneratedUrl, link.CreationDate, link.countOfTransitions);
            throw new InvalidCastException();
        }
    }
}