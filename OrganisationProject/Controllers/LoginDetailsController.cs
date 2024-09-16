using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Service.Interfaces;
using Common.Models;

[ApiController]
[Route("api/[controller]")]
public class LoginDetailsController : ControllerBase
{
    private readonly ILoginDetailsService _service;

    public LoginDetailsController(ILoginDetailsService service)
    {
        _service = service;
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] LoginDetailsDto loginDetailsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _service.CreateLoginDetailsAsync(loginDetailsDto);
            return Ok();
        }
        catch (Exception ex)
        {
          
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<IEnumerable<LoginDetailsDto>>> Get()
    {
        var staffList = await _service.GetAllStaffAsync();
        return Ok(staffList);
    }
    [HttpGet]
    [Route("GetById/{id}")]
    public async Task<ActionResult<LoginDetailsDto>> GetById(int id)
    {
        var staff = await _service.GetLoginDetailsByIdAsync(id);

        if (staff == null)
        {
            return NotFound();
        }

        return Ok(staff);
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var loginDetails = await _service.VerifyLoginAsync(request.UserName, request.Password);
        if (loginDetails != null)
        {
            
            return Ok(loginDetails);
        }
        return Unauthorized("Invalid login attempt.");
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            await _service.DeleteUserAsync(id);
            return NoContent(); 
        }
        catch (KeyNotFoundException)
        {
            return NotFound(); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error.");
        }
    }


}
