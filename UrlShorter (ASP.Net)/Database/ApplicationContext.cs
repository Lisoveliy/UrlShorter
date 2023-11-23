using Microsoft.EntityFrameworkCore;
using UrlShorter.Database.Entities;

namespace UrlShorter.Database
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
        public DbSet<Link> Links { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            Database.EnsureCreated();
        }
    }
}
