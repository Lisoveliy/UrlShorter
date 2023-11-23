using Microsoft.AspNetCore.Mvc;

namespace UrlShorter.Controllers
{
    /// <summary>
    /// Controller for Modify list of links
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        /// <summary>
        /// Get all links
        /// </summary>
        /// <returns>Link objects</returns>
        [HttpGet("get")]
        public async Task<LinksDTO.LinkDTO[]> GetAllLinks()
        {
            await Task.CompletedTask;
            return new LinksDTO.LinkDTO[] { };
        }
        /// <summary>
        /// Add link to database
        /// </summary>
        /// <param name="realurl">Link for reduction</param>
        /// <returns>Link object</returns>
        [HttpPost("add")]
        public async Task<LinksDTO.LinkDTO> AddLink(string realurl)
        {
            await Task.CompletedTask;
            return new(null!, null!, new(), 0);
        }
        /// <summary>
        /// Remove link from database
        /// </summary>
        /// <param name="id">Id of link</param>
        /// <returns>Status of operation</returns>
        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveLink(int id)
        {
            await Task.CompletedTask;
            return Ok();
        }
    }
}
