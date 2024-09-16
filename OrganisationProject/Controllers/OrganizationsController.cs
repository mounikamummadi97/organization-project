using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Service.Interfaces;
using Common.Models;

[ApiController]
[Route("api/[controller]")]
public class OrganizationsController : ControllerBase
{
    private readonly IOrganizationService _service;

    public OrganizationsController(IOrganizationService service)
    {
        _service = service;
    }

    // Create a new organization
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] OrganizationsModel organizationModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _service.CreateOrganizationAsync(organizationModel);
            return Ok();
        }
        catch (Exception ex)
        {

            return StatusCode(500, "Internal server error");
        }
    }
   

    
    [HttpGet("Get")]
    public async Task<ActionResult<IEnumerable<OrganizationsModel>>> Get()
    {
        var organizations = await _service.GetAllOrganizationsAsync();
        return Ok(organizations);
    }

   
    [HttpGet("GetById/{id}")]
    public async Task<ActionResult<OrganizationsModel>> GetById(int id)
    {
        try
        {
            var organization = await _service.GetOrganizationByIdAsync(id);

            if (organization == null)
            {
                return NotFound();
            }

            return Ok(organization);
        }
        catch (Exception ex)
        {
            // Log exception details here
            return StatusCode(500, "Internal server error");
        }
    }

    // Update an existing organization
    //[HttpPut("Update")]
    //public async Task<IActionResult> Update([FromBody] OrganizationsModel organizationModel)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    try
    //    {
    //        await _service.UpdateOrganizationAsync(organizationModel);
    //        return NoContent();
    //    }
    //    catch (KeyNotFoundException)
    //    {
    //        return NotFound();
    //    }
    //    catch (Exception ex)
    //    {
    //        // Log exception details here
    //        return StatusCode(500, "Internal server error");
    //    }
    //}

    // Delete an organization
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _service.DeleteOrganizationAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
        catch (Exception ex)
        {
            // Log exception details here we implemented
            return StatusCode(500, "Internal server error");
        }
    }
}
