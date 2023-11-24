using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Configuration;
using UrlShorter.Database;
using UrlShorter.Services.Link.LinkModels;
using UrlShorter.Services.LinkGenerator;

namespace UrlShorter.Tests
{
    [TestClass]
    public class LinkServ
    {
        const string connectionstring = "Server=localhost; Database=urlshortertest; Uid=aspnet; Password=Qwerty123"; //Change it for your DB
        RepositoryService database = new RepositoryService(new DbContextOptionsBuilder<RepositoryService>().UseMySql(connectionstring, ServerVersion.AutoDetect(connectionstring)).Options);
        public void resetDB()
        {
            database.Database.EnsureDeleted();
            database.Database.EnsureCreated();
        }
        [TestMethod]
        public async Task AddLink()
        {
            resetDB();
            ILinkGeneratorService linkGenerator = new LinkGeneratorService(database, null);
            var service = new Services.Link.LinkService(database, linkGenerator);
            var link = await service.CreateLink("https://google.com");
            var returned = await service.GetLinkById(link!.Id);
            Assert.AreEqual<Link?>(link, returned);
        }
        [TestMethod]
        public async Task NotExistingLink()
        {
            resetDB();
            ILinkGeneratorService linkGenerator = new LinkGeneratorService(database, null);
            var service = new Services.Link.LinkService(database, linkGenerator);
            var returned = await service.GetLinkById(1);
            Assert.AreEqual(returned, null);
        }
        [TestMethod]
        public async Task RemoveLink()
        {
            resetDB();
            ILinkGeneratorService linkGenerator = new LinkGeneratorService(database, null);
            var service = new Services.Link.LinkService(database, linkGenerator);
            var link = await service.CreateLink("https://google.com");
            await service.RemoveLinkById(link!.Id);
            var returned = await service.GetLinkById(link.Id);
            Assert.AreEqual(returned, null);
        }
        [TestMethod]
        public async Task ModifiedLink()
        {
            resetDB();
            ILinkGeneratorService linkGenerator = new LinkGeneratorService(database, null);
            var service = new Services.Link.LinkService(database, linkGenerator);
            var link = await service.CreateLink("https://google.com");
            await service.ModifyLink(link!.Id, "https://vk.com");
            var returned = await service.GetLinkById(link.Id);
            Assert.AreNotEqual(link.DestinationUrl, returned!.DestinationUrl);
        }
        [TestMethod]
        public async Task CheckForRecreation()
        {
            resetDB();
            ILinkGeneratorService linkGenerator = new LinkGeneratorService(database, null);
            var service = new Services.Link.LinkService(database, linkGenerator);
            var link = await service.CreateLink("https://google.com");
            var link2 = await service.CreateLink("https://google.com");
            Assert.IsTrue(link2 == null);
        }
    }
    [TestClass]
    public class LinkGeneratorServ
    {

    }
}
