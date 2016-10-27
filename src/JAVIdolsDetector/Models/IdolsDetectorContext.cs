using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace JAVIdolsDetector.Models
{
    public partial class IdolsDetectorContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=IdolsDetector;Persist Security Info=True;User ID=IdolsDetectorAdmin;Password=1234554321;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>(entity =>
            {
                entity.HasIndex(e => e.Isocode)
                    .HasName("u_Country_1")
                    .IsUnique();

                entity.Property(e => e.CountryName)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Isocode)
                    .IsRequired()
                    .HasColumnName("ISOCode")
                    .HasColumnType("varchar(5)");
            });

            modelBuilder.Entity<Face>(entity =>
            {
                entity.HasIndex(e => e.FaceOnlineId)
                    .HasName("u_Face_1")
                    .IsUnique();

                entity.HasIndex(e => new { e.FaceOnlineId, e.PersonId })
                    .HasName("u_Face_2")
                    .IsUnique();

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Face)
                    .HasForeignKey(d => d.PersonId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_Person_Face");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasIndex(e => e.PersonOnlineId)
                    .HasName("u_Person_1")
                    .IsUnique();

                entity.HasIndex(e => new { e.PersonGroupId, e.Name, e.Alias })
                    .HasName("u_Person_2")
                    .IsUnique();

                entity.Property(e => e.Alias)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.EyeColor).HasColumnType("varchar(50)");

                entity.Property(e => e.HairColor).HasColumnType("varchar(50)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Person)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("fk_PersonGroup_Country");

                entity.HasOne(d => d.PersonGroup)
                    .WithMany(p => p.Person)
                    .HasForeignKey(d => d.PersonGroupId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_PersonGroup_Person");
            });

            modelBuilder.Entity<PersonGroup>(entity =>
            {
                entity.HasIndex(e => e.PersonGroupOnlineId)
                    .HasName("u_PersonGroup_1")
                    .IsUnique();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.PersonGroupOnlineId)
                    .IsRequired()
                    .HasColumnType("varchar(64)");

                entity.Property(e => e.TrainingStatus).HasColumnType("varchar(50)");
            });
        }

        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Face> Face { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<PersonGroup> PersonGroup { get; set; }
    }
}