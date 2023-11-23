using Microsoft.EntityFrameworkCore;
using UrlShorter.Database.Entities;

namespace UrlShorter.Database
{
    public class DatabaseService : DbContext
    {
        public DatabaseService(DbContextOptions<DatabaseService> options) : base(options) {
            Database.EnsureCreated();
        }
        public DbSet<Link> Links { get; set; }
    }
}
