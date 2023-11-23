using Microsoft.AspNetCore.Mvc;
using UrlShorter.Services.Redirect;

namespace UrlShorter.Controllers.Redirect
{
    [ApiController]
    public class RedirectController : ControllerBase
    {
        private readonly IRedirectService redirectService;
        public RedirectController(IRedirectService redirectService) => this.redirectService = redirectService;
        [HttpGet("{linkhash}")]
        public async Task<ActionResult> RedirectUsingHash(string linkhash)
        {
            var url = await redirectService.GetRedirectURL(linkhash);
            if (url == null)
                return NotFound();
            return Redirect(url);
        }
    }
}