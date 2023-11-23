namespace UrlShorter.Services.Link
{
    public interface ILinkService
    {
        /// <summary>
        /// Create Short link by Destination URL
        /// </summary>
        /// <param name="realUrl">Link to redirect from short link</param>
        /// <returns>Link Service Object</returns>
        public Task<LinkModels.Link> CreateLink(string realUrl);
        /// <summary>
        /// Get All Short links
        /// </summary>
        /// <returns>Link Service Objects</returns>
        public LinkModels.Link[] GetLinks(int offset, int count);
        /// <summary>
        /// Modify link by ID (Change URL, Reset Counter)
        /// </summary>
        /// <param name="id">ID of modifying link</param>
        /// <param name="realUrl">Real URL</param>
        /// <param name="resetCounter">Parameter reseting counter</param>
        /// <returns>Link Service Object or null on error</returns>
        public Task<LinkModels.Link?> ModifyLink(int id, string realUrl, bool resetCounter = false);
        /// <summary>
        /// Get Link by ID
        /// </summary>
        /// <param name="id">ID of link</param>
        /// <returns>Link Service Object or null on error</returns>
        public Task<LinkModels.Link?> GetLinkById(int id);
        /// <summary>
        /// Remove link from database by id
        /// </summary>
        /// <param name="id">ID of link</param>
        /// <returns>Status of execution</returns>
        public Task<bool> RemoveLinkById(int id);
    }
}