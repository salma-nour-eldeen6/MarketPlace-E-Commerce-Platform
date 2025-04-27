using IA_marketPlace.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace IA_marketPlace.Services
{
    public class TokenServicescs : ITokenServices
    {
        private readonly IConfiguration _config;

        public TokenServicescs(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var UserClaims = new List<Claim>
            {
                // token generated id 
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // design token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: UserClaims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
            // generate token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }

        
        public async Task<object> RefreshTokenAsync(string refreshToken)
        {
            var userId = await _refreshTokenRepository.ValidateRefreshTokenAsync(refreshToken);
            if (userId == null)
                return new { message = "Invalid or expired refresh token" };

            var user = await _userRepository.GetUserByIdAsync(userId.Value);
            if (user == null)
                return new { message = "User not found" };

            var newAccessToken = GenerateToken(user);

            var newRefreshToken = GenerateRefreshToken();

            var oldRefreshToken = await _refreshTokenRepository.GetRefreshTokenByUserId(user.UserId);
            if (oldRefreshToken != null)
            {
                await _refreshTokenRepository.DeleteRefreshTokenAsync(oldRefreshToken);
            }

            await _refreshTokenRepository.SaveRefreshTokenAsync(user.UserId, newRefreshToken);

            return new
            {
                token = newAccessToken,
                expiration = DateTime.Now.AddHours(1),
                refreshToken = newRefreshToken,
                message = "Token refreshed successfully"
            };
        }
    }
}
