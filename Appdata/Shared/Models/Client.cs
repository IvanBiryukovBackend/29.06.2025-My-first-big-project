using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoSalon.Appdata.Shared.Models;

namespace AutoSalon.Appdata.Models;

public class Client
{
    [Key]
    [Column("id_client")]
    public int IdClient { get; set; }
    [Column("first_name")]
    public string FirstName { get; set; } = null!;
    [Column("middle_name")]
    public string MiddleName { get; set; } = null!;
    [Column("last_name")]
    public string? LastName { get; set; }
    [Column("passport_series")]
    public int PassportSeries { get; set; }
    [Column("passport_number")]
    public int PassportNumber { get; set; }
    [Column("home_address")]
    public string HomeAddress { get; set; } = null!;
    [Column("number")]
    public string Number { get; set; } = null!;
    [Column("delivery")]
    public bool Delivery { get; set; }
    [Column("type_payment")]
    public TypePayment TypePayment { get; set; }
    [Column("first_name")]

    public int IdProduct { get; set; }

    public virtual Product IdProductNavigation { get; set; } = null!;
}
