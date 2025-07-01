using AutoSalon.Appdata.Models;
using AutoSalon.Appdata.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoSalon.Appdata.Shared.DbContext;

public partial class AutosalonDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public AutosalonDbContext()
    {
    }

    public AutosalonDbContext(DbContextOptions<AutosalonDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<TehnicalData> TehnicalData { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=autosalon_db;Trusted_Connection=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.IdClient).HasName("PK_client_id");

            entity.ToTable("client");

            entity.HasIndex(e => e.PassportSeries, "UQ__client__070F18E05A2CD632");

            entity.HasIndex(e => e.PassportNumber, "UQ__client__D2CA6299A01508CC");

            entity.Property(e => e.IdClient).HasColumnName("id_client");
            entity.Property(e => e.Delivery).HasColumnName("delivery");
            entity.Property(e => e.FirstName)
                .HasMaxLength(20)
                .HasColumnName("first_name");
            entity.Property(e => e.HomeAddress)
                .HasMaxLength(40)
                .HasColumnName("home_address");
            entity.Property(e => e.IdProduct).HasColumnName("id_product");
            entity.Property(e => e.LastName)
                .HasMaxLength(30)
                .HasColumnName("last_name");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(30)
                .HasColumnName("middle_name");
            entity.Property(e => e.Number)
                .HasMaxLength(20)
                .HasColumnName("number");
            entity.Property(e => e.PassportNumber).HasColumnName("passport_number");
            entity.Property(e => e.PassportSeries).HasColumnName("passport_series");
            entity.Property(e => e.TypePayment).HasColumnName("type_payment");

            entity.HasOne(d => d.IdProductNavigation).WithMany(p => p.Clients)
                .HasForeignKey(d => d.IdProduct)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_client_car");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.IdProduct).HasName("PK_product_id");

            entity.ToTable("product");

            entity.Property(e => e.IdProduct).HasColumnName("id_product");
            entity.Property(e => e.Availability).HasColumnName("availability");
            entity.Property(e => e.CountyManufacturer)
                .HasMaxLength(50)
                .HasColumnName("county_manufacturer");
            entity.Property(e => e.IdTehnical).HasColumnName("id_tehnical");
            entity.Property(e => e.MarkaCar)
                .HasMaxLength(50)
                .HasColumnName("marka_car");
            entity.Property(e => e.ModelCar)
                .HasMaxLength(100)
                .HasColumnName("model_car");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");

            entity.HasOne(d => d.IdTehnicalNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.IdTehnical)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_car_tehnical");
        });

        modelBuilder.Entity<TehnicalData>(entity =>
        {
            entity.HasKey(e => e.IdTehnical).HasName("PR_tehnical_id");

            entity.ToTable("tehnical_data");

            entity.Property(e => e.IdTehnical).HasColumnName("id_tehnical");
            entity.Property(e => e.EngineDisplacement)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("engine_displacement");
            entity.Property(e => e.EngineLocation).HasColumnName("engine_location");
            entity.Property(e => e.NumberDoor).HasColumnName("number_door");
            entity.Property(e => e.NumberPlace).HasColumnName("number_place");
            entity.Property(e => e.TypeBodywork)
                .HasMaxLength(50)
                .HasColumnName("type_bodywork");
            entity.Property(e => e.TypeEngine).HasColumnName("type_engine");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
