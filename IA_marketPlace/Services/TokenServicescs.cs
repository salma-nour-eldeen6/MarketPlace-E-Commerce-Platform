using IA_marketPlace.Models;
using IA_marketPlace.Repository;
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
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IUserRepository _userRepository;


        public TokenServicescs(IConfiguration config, IRefreshTokenRepository refreshTokenRepository, IUserRepository userRepository)
        {
            _config = config;
            _refreshTokenRepository = refreshTokenRepository;
            _userRepository = userRepository;
        }

        public string GenerateToken(User user)
        {
            var UserClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: UserClaims,
                expires: DateTime.Now.AddMinutes(4),
                signingCredentials: creds
            );
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


            return new
            {
                token = newAccessToken,
                expiration = DateTime.Now.AddMinutes(4),
                refreshToken = refreshToken,
                message = "Token refreshed successfully"
            };
        }

    }
}
