using AutoSalon.Appdata.Shared.Models;

namespace AutoSalon.Appdata.Dto.Product;

public class ConfigurationCarDto
{
    public string? CountyManufacturer { get; set; }
    public string? MarkaCar { get; set; }
    public string? ModelCar { get; set; }
    public Availability Availability { get; set; }
    public decimal Price { get; set; }
    public string TypeBodywork { get; set; } = null!;
    public int NumberDoor { get; set; }
    public int NumberPlace { get; set; }
    public TypeEngine TypeEngine { get; set; }
    public EngineLocation EngineLocation { get; set; }
    public decimal EngineDisplacement { get; set; }
}