using IA_marketPlace.Data;
using IA_marketPlace.Models;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly MarketplaceContext _context;

        public RefreshTokenRepository(MarketplaceContext context)
        {
            _context = context;
        }

        public async Task SaveRefreshTokenAsync(int userId, string refreshToken)
        {
            var token = new RefreshToken
            {
                Token = refreshToken,
                UserId = userId,
                ExpiryDate = DateTime.Now.AddDays(7)
            };

            await _context.RefreshTokens.AddAsync(token);
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshToken> GetRefreshTokenByUserId(int userId)
        {
            return await _context.RefreshTokens
                                 .Where(rt => rt.UserId == userId)
                                 .FirstOrDefaultAsync();
        }

        public async Task DeleteRefreshTokenAsync(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Remove(refreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRefreshTokensByUserIdAsync(int userId)
        {
            var tokens = await _context.RefreshTokens.Where(rt => rt.UserId == userId).ToListAsync();
            _context.RefreshTokens.RemoveRange(tokens);
            await _context.SaveChangesAsync();
        }

        public async Task<int?> ValidateRefreshTokenAsync(string refreshToken)
        {
            var tokenInDb = await _context.RefreshTokens
            .FirstOrDefaultAsync(r => r.Token == refreshToken && r.ExpiryDate > DateTime.Now);

            return tokenInDb?.UserId;
        }
    }
}