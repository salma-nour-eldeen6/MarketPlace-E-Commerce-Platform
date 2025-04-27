using IA_marketPlace.Models;

namespace IA_marketPlace.Services
{
    public interface ITokenServices
    {
        string GenerateToken(User user);
        string GenerateRefreshToken();
       Task<object> RefreshTokenAsync(string refreshToken);

    }
}
