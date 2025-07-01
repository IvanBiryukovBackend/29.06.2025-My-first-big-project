using AutoSalon.Appdata.Shared.Models;

namespace AutoSalon.Appdata.Dto.TehnicalData;

public class TehnicalDataDto
{
    public int IdTehnical { get; set; }

    public string TypeBodywork { get; set; } = null!;

    public int NumberDoor { get; set; }

    public int NumberPlace { get; set; }

    public TypeEngine TypeEngine { get; set; }

    public EngineLocation EngineLocation { get; set; }

    public decimal EngineDisplacement { get; set; }
}