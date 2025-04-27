using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Services;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository

    {
        private readonly MarketplaceContext _context;
        private readonly IEmailEncryptionService _emailEncryptionService;

        public UserRepository(MarketplaceContext context) : base(context)
        {
            _context = context;
        }

        public UserRepository(MarketplaceContext context, IEmailEncryptionService emailEncryptionService) : base(context)
        {
            _context = context;
            _emailEncryptionService = emailEncryptionService;
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            string encryptedEmail = _emailEncryptionService.Encrypt(email);
            return await _context.Users.AnyAsync(u => u.Email == encryptedEmail);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            string encryptedEmail = _emailEncryptionService.Encrypt(email);
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == encryptedEmail);
        }

       

        public async Task<User> GetUserByRefreshTokenAsync(string token)
        {
            var refreshToken = await _context.RefreshTokens
                                             .Include(rt => rt.User)
                                             .FirstOrDefaultAsync(rt => rt.Token == token);

            return refreshToken?.User;
        }
        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }
    }
}


