using AutoSalon.Appdata.Dto;
using AutoSalon.Appdata.Dto.Client;
using AutoSalon.Appdata.Dto.Product;
using AutoSalon.Appdata.Dto.TehnicalData;
using AutoSalon.Appdata.Models;
using AutoSalon.Appdata.Shared.DbContext;
using Microsoft.AspNetCore.Mvc;

namespace AutoSalon.Controllers;

[Route("api/Client")]
[ApiController]
public class ClientController : ControllerBase
{
    private readonly AutosalonDbContext _context;

    public ClientController(AutosalonDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllClient()
    {
        try
        {
            var client = _context.Clients
                .Select(c => new ClientDto 
                {
                    IdClient = c.IdClient,
                    FirstName = c.FirstName,
                    MiddleName = c.MiddleName,
                    LastName = c.LastName,
                    PassportSeries = c.PassportSeries,
                    PassportNumber = c.PassportNumber,
                    HomeAddress = c.HomeAddress,
                    Number = c.Number, 
                    Delivery = c.Delivery,
                    TypePayment = c.TypePayment,
                }).ToList();

            return Ok(client);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpGet("FullInfo")]
    public IActionResult GetFullInfoClient()
    {
        try
        {
            var client = _context.Clients
                .Select(c => new ClientDto 
                {
                    IdClient = c.IdClient,
                    FirstName = c.FirstName,
                    MiddleName = c.MiddleName,
                    LastName = c.LastName,
                    PassportSeries = c.PassportSeries,
                    PassportNumber = c.PassportNumber,
                    HomeAddress = c.HomeAddress,
                    Number = c.Number, 
                    Delivery = c.Delivery,
                    TypePayment = c.TypePayment,
                    IdProductNavigation = new ProductDto()
                    {
                        IdProduct = c.IdProduct,
                        Availability = c.IdProductNavigation.Availability,
                        CountyManufacturer = c.IdProductNavigation.CountyManufacturer,
                        MarkaCar = c.IdProductNavigation.MarkaCar,
                        ModelCar = c.IdProductNavigation.ModelCar,
                        Price = c.IdProductNavigation.Price,
                        Tehnicals = new List<TehnicalDataDto>()
                        {
                            new TehnicalDataDto
                            {
                                IdTehnical = c.IdProductNavigation.IdTehnicalNavigation.IdTehnical,
                                EngineDisplacement = c.IdProductNavigation.IdTehnicalNavigation.EngineDisplacement,
                                NumberDoor = c.IdProductNavigation.IdTehnicalNavigation.NumberDoor,
                                NumberPlace = c.IdProductNavigation.IdTehnicalNavigation.NumberPlace,
                                TypeBodywork = c.IdProductNavigation.IdTehnicalNavigation.TypeBodywork,
                                TypeEngine = c.IdProductNavigation.IdTehnicalNavigation.TypeEngine,
                                EngineLocation = c.IdProductNavigation.IdTehnicalNavigation.EngineLocation,
                            }
                        }
                    }
                }).ToList();

            return Ok(client);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public IActionResult CreateClient([FromBody] AddClientDto request)
    {
        try
        {
            var client = new Client()
            {
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                PassportSeries = request.PassportSeries,
                PassportNumber = request.PassportNumber,
                HomeAddress = request.HomeAddress,
                Number = request.Number, 
                Delivery = request.Delivery,
                TypePayment = request.TypePayment,
                IdProduct = request.IdProduct,
            };
            _context.Add(client);
            _context.SaveChanges();
            return Ok(client);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateClient(int id ,[FromBody] UpdateClientDto request)
    {
        try
        {
            var client = _context.Clients.Find(id);
            if (client == null)
            {
                return BadRequest();
            }

            client.FirstName = request.FirstName;
            client.MiddleName = request.MiddleName;
            client.LastName = request.LastName;
            client.PassportSeries = request.PassportSeries;
            client.PassportNumber = request.PassportNumber;
            client.HomeAddress = request.HomeAddress;
            client.Number = request.Number;
            client.Delivery = request.Delivery;
            client.TypePayment = request.TypePayment;
            client.IdProduct = request.IdProduct;
            
            _context.Update(client);
            _context.SaveChanges();
            return Ok(client);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteClient(int id)
    {
        try
        {
            var client = _context.Clients.Find(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            _context.SaveChanges();
        
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}