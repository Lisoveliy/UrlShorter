namespace UrlShorter.Services.Redirect
{
    public interface IRedirectService
    {
        public Task<string?> GetRedirectURL(string hash);
    }
}