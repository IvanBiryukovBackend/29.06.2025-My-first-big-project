using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoSalon.Appdata.Models;

namespace AutoSalon.Appdata.Shared.Models;

public class TehnicalData
{
    [Key]
    [Column("id_tehnical")]
    public int IdTehnical { get; set; }

    [Column("type_bodywork")]
    public string TypeBodywork { get; set; } = null!;

    [Column("number_door")]
    public int NumberDoor { get; set; }

    [Column("number_place")]
    public int NumberPlace { get; set; }

    [Column("type_engine")]
    public TypeEngine TypeEngine { get; set; }

    [Column("engine_location")]
    public EngineLocation EngineLocation { get; set; }

    [Column("engine_displacement")]
    public decimal EngineDisplacement { get; set; }
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}