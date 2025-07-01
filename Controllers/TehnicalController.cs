using AutoSalon.Appdata.Dto;
using AutoSalon.Appdata.Dto.TehnicalData;
using AutoSalon.Appdata.Models;
using AutoSalon.Appdata.Shared.DbContext;
using AutoSalon.Appdata.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace AutoSalon.Controllers;

[Route("api/Tehnical")]
[ApiController]
public class TehnicalController : ControllerBase
{
    private readonly AutosalonDbContext _context;

    public TehnicalController(AutosalonDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllTehnicalData()
    {
        try
        {
            var tehnicalData = _context.TehnicalData
                .Select(t => new TehnicalDataDto
                {
                    IdTehnical = t.IdTehnical,
                    TypeBodywork = t.TypeBodywork,
                    NumberDoor = t.NumberDoor,
                    EngineDisplacement = t.EngineDisplacement,
                    EngineLocation = t.EngineLocation,
                    NumberPlace = t.NumberPlace,
                    TypeEngine = t.TypeEngine
                }).ToList();

            return Ok(tehnicalData);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public IActionResult CreateTehnicalData([FromBody] AddTehnicalDto request)
    {
        try
        {
            var tehnical = new TehnicalData()
            {
                TypeBodywork = request.TypeBodywork,
                NumberDoor = request.NumberDoor,
                EngineDisplacement = request.EngineDisplacement,
                EngineLocation = request.EngineLocation,
                NumberPlace = request.NumberPlace,
                TypeEngine = request.TypeEngine
            };

            _context.Add(tehnical);
            _context.SaveChanges();

            return Ok(tehnical);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPatch("id")]
    public IActionResult UpdateTehnicalData(int id ,[FromForm] UpdateTehnicalDto request)
    {
        try
        {
            var tehnical = _context.TehnicalData.Find(id);
            if (tehnical == null)
            {
                return BadRequest();
            }

            tehnical.TypeBodywork = request.TypeBodywork;
            tehnical.NumberDoor = request.NumberDoor;
            tehnical.EngineDisplacement = request.EngineDisplacement;
            tehnical.EngineLocation = request.EngineLocation;
            tehnical.NumberPlace = request.NumberPlace;
            tehnical.TypeEngine = request.TypeEngine;
            
            _context.TehnicalData.Update(tehnical);
            _context.SaveChanges();
            return Ok(tehnical);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTehnicalData(int id)
    {
        try
        {
            var tehnical = _context.TehnicalData.Find(id);
            if (tehnical == null)
            {
                return NotFound();
            }

            _context.TehnicalData.Remove(tehnical);
            _context.SaveChanges();
        
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}