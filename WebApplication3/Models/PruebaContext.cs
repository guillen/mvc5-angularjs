namespace WebApplication3.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class PruebaContext : DbContext
    {
        public PruebaContext()
            : base("name=PruebaContext")
        {
        }

        public virtual DbSet<Tasks> Tasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tasks>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Tasks>()
                .Property(e => e.Description)
                .IsUnicode(false);
        }
    }
}
