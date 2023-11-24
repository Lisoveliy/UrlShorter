using Microsoft.EntityFrameworkCore;
using UrlShorter.Database.Entities;

namespace UrlShorter.Database
{
    public class RepositoryService : DbContext
    {
        public RepositoryService(DbContextOptions<RepositoryService> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Link> Links { get; set; }
    }
}