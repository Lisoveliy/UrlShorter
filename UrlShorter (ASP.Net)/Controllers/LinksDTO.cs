namespace UrlShorter.Controllers.LinksDTO;

/// <summary>
/// Link object
/// </summary>
/// <param name="realUrl">Url to redirect</param>
/// <param name="shortUrl">Url from redirect</param>
/// <param name="creationDate">Time from added to DB</param>
/// <param name="countOfTransitions">Count of openning link</param>
public record LinkDTO(
    string realUrl, 
    string shortUrl, 
    DateTime creationDate, 
    int countOfTransitions);
