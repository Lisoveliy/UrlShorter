namespace UrlShorter.Services.LinkGenerator
{
    public interface ILinkGeneratorService
    {
        public Task<string> GetUniquePath();
    }
}
