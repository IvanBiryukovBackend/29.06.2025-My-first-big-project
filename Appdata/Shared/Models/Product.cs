using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoSalon.Appdata.Models;

namespace AutoSalon.Appdata.Shared.Models;

public class Product
{
    [Key]
    [Column("id_product")]
    public int IdProduct { get; set; }

    [Column("county_manufacturer")]
    public string? CountyManufacturer { get; set; }

    [Column("marka_car")]
    public string? MarkaCar { get; set; }

    [Column("model_car")]
    public string? ModelCar { get; set; }

    [Column("availability")]
    public Availability Availability { get; set; }

    [Column("price")]
    public decimal Price { get; set; }

    [ForeignKey("id_tehnical")]
    [Column("id_tehnical")]
    public int? IdTehnical { get; set; }

    public virtual ICollection<Client> Clients { get; set; } = new List<Client>();
    public virtual TehnicalData IdTehnicalNavigation { get; set; } = null!;
}
