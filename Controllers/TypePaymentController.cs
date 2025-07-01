using AutoSalon.Appdata.Dto.TypePaymentDto;
using AutoSalon.Appdata.Shared.DbContext;
using AutoSalon.Appdata.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace AutoSalon.Controllers;
[Route("api/TypePayment")]
[ApiController]
public class TypePaymentController : ControllerBase
{
    private readonly AutosalonDbContext _context;
    public TypePaymentController(AutosalonDbContext context)
    {
        _context = context;
    }
    [HttpPost("TypePaymentClientAndCar")]
    public IActionResult GetClientTypePaymentAndCar([FromBody] TypePaymentDto request)
    {
        try
        {
            var client = _context.Clients.AsQueryable();
            var result = client.Where(c=>c.TypePayment == request.TypePaymentId).Select(c=>new
            {
                Client = new
                {
                    c.IdClient,
                    c.FirstName,
                    c.MiddleName,
                    c.LastName,
                    c.TypePayment,
                    c.PassportSeries,
                    c.PassportNumber,
                    c.Number,
                    c.Delivery,
                    c.HomeAddress
                },
                Car = new
                {
                    c.IdProductNavigation.IdProduct,
                    c.IdProductNavigation.CountyManufacturer,
                    c.IdProductNavigation.MarkaCar,
                    c.IdProductNavigation.ModelCar,
                    c.IdProductNavigation.Availability,
                    c.IdProductNavigation.Price,
                }
            });
            
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}