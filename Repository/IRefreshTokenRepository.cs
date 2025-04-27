using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IRefreshTokenRepository
    {
       Task SaveRefreshTokenAsync(int userId, string refreshToken);
       Task<RefreshToken> GetRefreshTokenByUserId(int userId); 
       Task DeleteRefreshTokenAsync(RefreshToken refreshToken);
       Task DeleteRefreshTokensByUserIdAsync(int userId);
       Task<int?> ValidateRefreshTokenAsync(string refreshToken);

    }
}
