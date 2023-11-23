namespace UrlShorter.Services.Link
{
    public interface IRedirectService
    {

        public Task<string> GetRedirectURL(string hash);
    }
}
