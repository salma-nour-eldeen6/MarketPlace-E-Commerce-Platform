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

    public class RfreshToken : ControllerBase

    {

        private readonly ITokenServices _itokenservices;



        public RfreshToken(ITokenServices itokenservices)

        {

            _itokenservices = itokenservices;

        }



        [HttpPost("RefreshToken")]

        public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenRequest refreshTokenRequest)

        {

            var result = await _itokenservices.RefreshTokenAsync(refreshTokenRequest.Token);



            if (result == null)

            {

                return Unauthorized("Expired or Invalid");

            }

            return Ok(result);

        }



    }



}

