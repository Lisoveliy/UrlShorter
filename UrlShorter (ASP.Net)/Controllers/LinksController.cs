using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.ComponentModel.DataAnnotations;
using UrlShorter.Controllers.LinksDTO;
using UrlShorter.Services.Link;
using UrlShorter.Mappers;

namespace UrlShorter.Controllers
{
    /// <summary>
    /// Controller for Modify list of links
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly ILinkService linkService;
        public LinksController(ILinkService linkService) => this.linkService = linkService;
        /// <summary>
        /// Get all links
        /// </summary>
        /// <returns>Link objects</returns>
        [HttpGet("get")]
        public ActionResult<LinkDTO[]> GetAllLinks(int offset = 0, [Range(0, 50)] int count = 20)
        {
            var links = linkService.GetLinks(offset, count);
            return links.Select(x => x.Map<LinkDTO>()).ToArray();
        }
        /// <summary>
        /// Add link to database
        /// </summary>
        /// <param name="realurl">Link for reduction</param>
        /// <returns>Link object</returns>
        [HttpPost("add")]
        public async Task<LinkDTO> AddLink(string realurl)
        {
            var link = await linkService.CreateLink(realurl);
            return link.Map<LinkDTO>();
        }
        /// <summary>
        /// Remove link from database
        /// </summary>
        /// <param name="id">Id of link</param>
        /// <returns>Status of operation</returns>
        [HttpDelete("remove")]
        [SwaggerResponse(200, typeof(HttpResponseMessage), Description = "Normal execution")]
        [SwaggerResponse(404, typeof(NotFoundResult), Description = "Link not found")]
        public async Task<IActionResult> RemoveLink(int id)
        {
            var res = await linkService.RemoveLinkById(id);
            if(res)
                return Ok();
            return NotFound();
        }
        /// <summary>
        /// Modify link on database
        /// </summary>
        /// <param name="id">Id of link</param>
        /// <param name="newlink">New real link</param>
        /// <param name="resetcounter">Reset counter on redirect</param>
        /// <returns>New modified link</returns>
        [HttpPut("update")]
        [SwaggerResponse(200, typeof(LinkDTO), Description = "Normal execution")]
        [SwaggerResponse(404, typeof(NotFoundResult), Description = "Link not found")]
        public async Task<ActionResult<LinkDTO>> UpdateLink(int id, string newlink, bool resetcounter = false)
        {
            var res = await linkService.ModifyLink(id, newlink, resetcounter);
            if(res == null)
            {
                return NotFound();
            }
            return res.Map<LinkDTO>();
        }
    }
}
