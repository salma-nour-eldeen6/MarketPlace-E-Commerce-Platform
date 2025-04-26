using IA_marketPlace.Data;
using IA_marketPlace.Repository;
using IA_marketPlace.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IA_marketPlace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userService;
        private readonly IVendorRepository _vendorRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserController(IUserServices userService, IVendorRepository vendorRepo, IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;
            _vendorRepo = vendorRepo;
            _httpContextAccessor = httpContextAccessor;
        }

        // Register (async)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO dto)
        {
            var message = await _userService.RegisterAsync(dto);

            if (message.StartsWith("Registration successful"))
            {
                return Ok(message);
            }

            return BadRequest(message);
        }
        // Login (async)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var result = await _userService.LoginAsync(loginDto); // Call LoginAsync instead of Login

            if (result == null)
            {
                return BadRequest(new { error = "Invalid email or password." });
            }

            return Ok(new
            {
                message = result.Message,
                token = result.Token,
                refreshToken = result.RefreshToken,
                expiration = result.Expiration
            });
        }

        // Logout (async)
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var result = await _userService.LogoutAsync(); // Call LogoutAsync instead of Logout
            return Ok(result);
        }
    }
}

