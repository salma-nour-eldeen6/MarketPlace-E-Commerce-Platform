using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Services;
using Microsoft.EntityFrameworkCore;

namespace IA_marketPlace.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly IEmailEncryptionService _emailEncryptionService;
        public UserRepository(MarketplaceContext context) : base(context)
        {
        }
        public UserRepository(MarketplaceContext context, IEmailEncryptionService emailEncryptionService) : base(context)
        {
            _emailEncryptionService = emailEncryptionService;
        }
        public bool UserExists(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            var encryptedUsers = _context.Users.ToList();
            foreach (var user in encryptedUsers)
            {
                try
                {
                    string decryptedEmail = _emailEncryptionService.Decrypt(user.Email);

                    if (decryptedEmail == email)
                    {
                        return true;
                    }
                }
                catch (Exception)
                {
                    continue;
                }
            }

            return false;
        }



        public User GetUserByEmail(string email)
        {
            var users = _context.Users.ToList();

            foreach (var user in users)
            {
                try
                {
                    string decryptedEmail = _emailEncryptionService.Decrypt(user.Email);

                    if (decryptedEmail == email)
                    {
                        return user;
                    }
                }
                catch (Exception)
                {
                    continue;
                }
            }

            return null;
        }


        public User GetUserByRefreshToken(string token)
        {
            var refreshToken = _context.RefreshTokens
                                       .Include(rt => rt.User)
                                       .FirstOrDefault(rt => rt.Token == token);

            return refreshToken?.User;
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }




    }
}


