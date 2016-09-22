using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace JAVIdolsDetector.Models
{
    public partial class IdolsDetectorContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Face>(entity =>
            {
                entity.Property(e => e.FaceId).ValueGeneratedNever();

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Face)
                    .HasForeignKey(d => d.PersonId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_Person_Face");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(e => e.PersonId).ValueGeneratedNever();

                entity.Property(e => e.Alias).HasMaxLength(150);

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.EyeColor).HasColumnType("varchar(50)");

                entity.Property(e => e.HairColor).HasColumnType("varchar(50)");

                entity.Property(e => e.Name).HasMaxLength(150);

                entity.Property(e => e.PersonGroupId)
                    .IsRequired()
                    .HasColumnType("varchar(64)");

                entity.HasOne(d => d.PersonGroup)
                    .WithMany(p => p.Person)
                    .HasForeignKey(d => d.PersonGroupId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_PersonGroup_Person");
            });

            modelBuilder.Entity<PersonGroup>(entity =>
            {
                entity.Property(e => e.PersonGroupId).HasColumnType("varchar(64)");

                entity.Property(e => e.TrainingStatus).HasColumnType("varchar(50)");
            });
        }

        public virtual DbSet<Face> Face { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<PersonGroup> PersonGroup { get; set; }
    }
}