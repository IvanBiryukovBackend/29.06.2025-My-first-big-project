using AutoSalon.Appdata.Dto.TehnicalData;
using AutoSalon.Appdata.Shared.Models;

namespace AutoSalon.Appdata.Dto.Product;

public class ProductDto
{
    public int IdProduct { get; set; }
    public string? CountyManufacturer { get; set; }
    public string? MarkaCar { get; set; }
    public string? ModelCar { get; set; }
    public Availability Availability { get; set; }
    public decimal Price { get; set; }
    public ICollection<TehnicalDataDto> Tehnicals { get; set; }
}