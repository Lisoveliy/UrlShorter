using Microsoft.AspNetCore.Mvc;

namespace UrlShorter.Controllers
{
    [ApiController]
    public class RedirectController : ControllerBase
    {
        [HttpGet("{linkhash}")]
        public async Task<ActionResult> RedirectUsingHash(string linkhash)
        {
            await Task.CompletedTask;
            return Redirect("https://google.com");
        }
    }
}