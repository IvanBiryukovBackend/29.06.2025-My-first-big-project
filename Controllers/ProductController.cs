using AutoSalon.Appdata.Dto;
using AutoSalon.Appdata.Dto.Product;
using AutoSalon.Appdata.Dto.TehnicalData;
using AutoSalon.Appdata.Models;
using AutoSalon.Appdata.Shared.DbContext;
using AutoSalon.Appdata.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSalon.Controllers;

[Route("api/product")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly AutosalonDbContext _context;

    public ProductController(AutosalonDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllProduct()
    {
        try
        {
            var products = _context.Products
                .Select(p => new ProductDto
                {
                    IdProduct = p.IdProduct,
                    CountyManufacturer = p.CountyManufacturer,
                    MarkaCar = p.MarkaCar,
                    ModelCar = p.ModelCar,
                    Availability = p.Availability,
                    Price = p.Price,
                    Tehnicals = new List<TehnicalDataDto>()
                    {
                        new TehnicalDataDto
                        {
                            EngineDisplacement = p.IdTehnicalNavigation.EngineDisplacement,
                            EngineLocation = p.IdTehnicalNavigation.EngineLocation,
                            IdTehnical = p.IdTehnicalNavigation.IdTehnical,
                            NumberDoor = p.IdTehnicalNavigation.NumberDoor,
                            NumberPlace = p.IdTehnicalNavigation.NumberPlace,
                            TypeBodywork = p.IdTehnicalNavigation.TypeBodywork,
                            TypeEngine = p.IdTehnicalNavigation.TypeEngine,
                        }
                    }
                }).ToList();

            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    [HttpPost("CarFind")]
    public IActionResult GetFindVihcle([FromBody] FindProductDto product)
    {
        try
        {
            var products = _context.Products
                .Where(p => (p.MarkaCar == product.MarkaCar && p.ModelCar == product.ModelCar))
                .Select(p => new ProductDto
                {
                    IdProduct = p.IdProduct,
                    CountyManufacturer = p.CountyManufacturer,
                    MarkaCar = p.MarkaCar,
                    ModelCar = p.ModelCar,
                    Availability = p.Availability,
                    Price = p.Price,
                    Tehnicals = new List<TehnicalDataDto>()
                    {
                        new TehnicalDataDto
                        {
                            EngineDisplacement = p.IdTehnicalNavigation.EngineDisplacement,
                            EngineLocation = p.IdTehnicalNavigation.EngineLocation,
                            IdTehnical = p.IdTehnicalNavigation.IdTehnical,
                            NumberDoor = p.IdTehnicalNavigation.NumberDoor,
                            NumberPlace = p.IdTehnicalNavigation.NumberPlace,
                            TypeBodywork = p.IdTehnicalNavigation.TypeBodywork,
                            TypeEngine = p.IdTehnicalNavigation.TypeEngine,
                        }
                    }
                })
                .ToList();

            return Ok(products);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
    
    [HttpPost("TehnicalFind")]
    public IActionResult GetFindVihcle([FromBody] FindTehnicalDto tehnical)
    {
        try
        {
            var products = _context.Products
                .Where(p => (p.ModelCar == tehnical.ModelCar))
                .Select(p => new ProductDto
                {
                    IdProduct = p.IdProduct,
                    MarkaCar = p.MarkaCar,
                    ModelCar = p.ModelCar,
                    Tehnicals = new List<TehnicalDataDto>
                    {
                        new TehnicalDataDto
                        {
                            IdTehnical = p.IdTehnicalNavigation.IdTehnical,
                            TypeBodywork = p.IdTehnicalNavigation.TypeBodywork,
                            NumberDoor = p.IdTehnicalNavigation.NumberDoor,
                            EngineDisplacement = p.IdTehnicalNavigation.EngineDisplacement,
                            EngineLocation = p.IdTehnicalNavigation.EngineLocation,
                            NumberPlace = p.IdTehnicalNavigation.NumberPlace,
                            TypeEngine = p.IdTehnicalNavigation.TypeEngine, 
                        }
                    }
                })
                .ToList();

            return Ok(products);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, [FromBody] UpdateProductDto request)
    {
        try
        {
            var product = _context.Products.FirstOrDefault(p => p.IdProduct == id);

            if (product == null || product.IdTehnical == null)
            {
                return BadRequest();
            }
            
            
            product.CountyManufacturer = request.CountyManufacturer;
            product.MarkaCar = request.MarkaCar;
            product.ModelCar = request.ModelCar;
            product.Availability = request.Availability;
            product.Price = request.Price;
            
            var tehnical = _context.TehnicalData.Find(product.IdTehnical);
            tehnical.TypeBodywork = request.TypeBodywork;
            tehnical.NumberDoor = request.NumberDoor;
            tehnical.NumberPlace = request.NumberPlace;
            tehnical.TypeEngine = request.TypeEngine;
            tehnical.EngineLocation = request.EngineLocation;
            tehnical.EngineDisplacement = request.EngineDisplacement;
            
            _context.Products.Update(product);
            _context.TehnicalData.Update(tehnical);
            _context.SaveChanges();

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        try
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();
        
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    [HttpPost("Configuration")]
    public IActionResult Configuration([FromBody] ConfigurationCarDto request)
    {
        try
        {
            var newTehnical = new TehnicalData
            {
                TypeBodywork = request.TypeBodywork,
                NumberDoor = request.NumberDoor,
                NumberPlace = request.NumberPlace,
                TypeEngine = request.TypeEngine,
                EngineLocation = request.EngineLocation,
                EngineDisplacement = request.EngineDisplacement
            };

            _context.TehnicalData.Add(newTehnical);
            _context.SaveChanges();
            var newCar = new Product
            {
                CountyManufacturer = request.CountyManufacturer,
                MarkaCar = request.MarkaCar,
                ModelCar = request.ModelCar,
                Availability = request.Availability,
                Price = request.Price,
                IdTehnical = newTehnical.IdTehnical
            };
            _context.Products.Add(newCar);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


}