using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Service.Interfaces;
using Common.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase
    {
        private readonly ILookupService _lookupService;

        public LookupController(ILookupService lookupService)
        {
            _lookupService = lookupService;
        }
        [HttpGet]
        public async Task<IActionResult> GetLookupDataList(string name, int id)
        {
            var lookups = _lookupService.GetLookupDataListAsync(name,id);
            return Ok(lookups);
        }
    }
}
