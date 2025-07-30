using Microsoft.EntityFrameworkCore;
using JwtSqlDemo.Models;

namespace JwtSqlDemo.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        //public DbSet<UserData> UserData { get; set; }

        public DbSet<WordScore> WordScore { get; set; }
        //public DbSet<InsertWordScore> InsertWordScore { get; set; }


        public DbSet<Test> vw_getUser { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ระบุว่าเป็น view และไม่มี primary key
            modelBuilder.Entity<Test>()
                .HasNoKey()
                .ToView("vw_getUser");
        }
    }
}
