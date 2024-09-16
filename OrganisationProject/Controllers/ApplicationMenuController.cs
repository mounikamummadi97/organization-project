using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationMenuController : ControllerBase
    {
        private readonly IApplicationMenuService _service;

        public ApplicationMenuController(IApplicationMenuService service)
        {
            _service = service;
        }

        [HttpGet("GetApplicationMenus")]
        public async Task<IActionResult> GetApplicationMenus([FromQuery] int roleId)
        {
            var result = await _service.GetApplicationMenusAsync(roleId);
             if (result == null || !result.Any())
            {
                return NotFound(); 
            }
            return Ok(result);
        }
    }
}
