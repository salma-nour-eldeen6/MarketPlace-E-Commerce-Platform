using IA_marketPlace.Data;
using IA_marketPlace.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IA_marketPlace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RfreshTokenController : ControllerBase
    {
        private readonly ITokenServices _itokenservices;
        public RfreshTokenController(ITokenServices itokenservices)
        {
            _itokenservices = itokenservices;
        }
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var result = await _itokenservices.RefreshTokenAsync(request.Token );

            if (result is { } && result.GetType().GetProperty("token") != null)
                return Ok(result);

            return Unauthorized(result);
        }


    }
}

