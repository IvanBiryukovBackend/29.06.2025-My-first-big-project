using AutoSalon.Appdata.Shared.Models;

namespace AutoSalon.Appdata.Dto.Client;

public class UpdateClientDto
{ 

    public string FirstName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public string? LastName { get; set; }

    public int PassportSeries { get; set; }

    public int PassportNumber { get; set; }

    public string HomeAddress { get; set; } = null!;

    public string Number { get; set; } = null!;

    public bool Delivery { get; set; }

    public TypePayment TypePayment { get; set; }

    public DateTime StartInfosave { get; set; }

    public int IdProduct { get; set; }
}