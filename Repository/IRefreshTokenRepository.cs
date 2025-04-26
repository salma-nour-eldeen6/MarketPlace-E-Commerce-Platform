using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> GetRefreshTokenByUserId(int userId);
        Task DeleteRefreshTokenAsync(RefreshToken refreshToken);
        Task DeleteRefreshTokensByUserIdAsync(int userId);
    }
}
