namespace UrlShorter.Services.Link.LinkModels;

public record Link(
    int Id,
    string DestinationUrl,
    string GeneratedUrl,
    DateTime creationDate,
    int countOfTransitions);