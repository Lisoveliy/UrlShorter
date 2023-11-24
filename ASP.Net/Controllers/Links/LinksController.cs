using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.ComponentModel.DataAnnotations;
using UrlShorter.Services.Link;
using UrlShorter.Mappers;

namespace UrlShorter.Controllers.Links
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
        public ActionResult<LinkDTOResponse[]> GetAllLinks(int offset = 0, [Range(0, 50)] int count = 20)
        {
            var links = linkService.GetLinks(offset, count);
            return links.Select(x => x.Map<LinkDTOResponse>()).ToArray();
        }

        /// <summary>
        /// Get link by id
        /// </summary>
        /// <param name="id">ID of link</param>
        /// <returns>Link object</returns>
        [HttpGet("get/{id}")]
        public async Task<ActionResult<LinkDTOResponse?>> GetLink(int id)
        {
            var link = await linkService.GetLinkById(id);
            if(link == null)
                return NotFound();
            return link.Map<LinkDTOResponse>();
        }
        /// <summary>
        /// Add link to database
        /// </summary>
        /// <param name="addUrlDTO">Link for reduction</param>
        /// <returns>Link object</returns>
        [HttpPost("add")]
        public async Task<ActionResult<LinkDTOResponse>> AddLink(AddUrlDTORequest addUrlDTO)
        {
            var link = await linkService.CreateLink(addUrlDTO.realUrl);
            if(link == null)
            {
                return BadRequest();
            }
            return link.Map<LinkDTOResponse>();
        }

        /// <summary>
        /// Modify link on database
        /// </summary>
        /// <param name="modifyUrlDTO">Modify link params</param>
        /// <returns>New modified link</returns>
        [HttpPut("update")]
        [SwaggerResponse(200, typeof(LinkDTOResponse), Description = "Normal execution")]
        [SwaggerResponse(404, typeof(NotFoundResult), Description = "Link not found")]
        public async Task<ActionResult<LinkDTOResponse>> UpdateLink(ModifyUrlDTORequest modifyUrlDTO)
        {
            var res = await linkService.ModifyLink(modifyUrlDTO.id, modifyUrlDTO.newlink, modifyUrlDTO.resetcounter);
            if (res == null)
            {
                return NotFound();
            }
            return res.Map<LinkDTOResponse>();
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
            if (res)
                return Ok();
            return NotFound();
        }
    }
}
