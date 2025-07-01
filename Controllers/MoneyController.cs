using AutoSalon.Appdata.Dto.Money;
using AutoSalon.Appdata.Dto.Product;
using AutoSalon.Appdata.Shared.DbContext;
using AutoSalon.Appdata.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSalon.Controllers;
[Route("api/Money")]
[ApiController]
public class MoneyController : ControllerBase
{
    private readonly AutosalonDbContext _context;

    public MoneyController(AutosalonDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult GetSumSellCar([FromBody] FindMarkaDto marka)
    {
        try
        {
            var client = _context.Clients.AsQueryable();
            if (!string.IsNullOrEmpty(marka.MarkaCar))
            {
                client = client.Where(c => c.IdProductNavigation.MarkaCar == marka.MarkaCar);
            }

            var result = client.Select(
                c=> new
                {
                    ClientList = new
                    {
                        c.IdClient,
                        c.FirstName,
                        c.MiddleName,
                        c.LastName,
                        c.Number,
                        c.PassportSeries,
                        c.PassportNumber,
                    },
                    CarInfo = new
                    {
                        c.IdProductNavigation.IdProduct,
                        c.IdProductNavigation.MarkaCar,
                        c.IdProductNavigation.ModelCar,
                        c.IdProductNavigation.Price,
                        TehnicalData = new List<TehnicalData>
                        {
                            new TehnicalData
                            {
                                TypeEngine = c.IdProductNavigation.IdTehnicalNavigation.TypeEngine,
                                EngineDisplacement = c.IdProductNavigation.IdTehnicalNavigation.EngineDisplacement,
                                NumberDoor = c.IdProductNavigation.IdTehnicalNavigation.NumberDoor
                            }
                        }
                    },
                }).ToList();
            
            
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("sales_summary")]
    public IActionResult GetTotalSellCar()
    {
        try
        {
            var productSell = _context.Clients
                .GroupBy(gb => new { gb.IdProductNavigation.MarkaCar, gb.IdProductNavigation.ModelCar })
                .Select(g => new
                {
                    Marka = g.Key.MarkaCar,
                    Model = g.Key.ModelCar,
                    TotalSales = g.Count(),
                    Sum = g.Sum(c => c.IdProductNavigation.Price)
                })
                .ToList();
            
            var totalSum = productSell.Sum(gb => gb.Sum);

            var result = new
            {
                SellModel = productSell,
                TotalSumSell = totalSum
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
}