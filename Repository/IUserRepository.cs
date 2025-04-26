using IA_marketPlace.Data;
using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<bool> UserExistsAsync(string email);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByRefreshTokenAsync(string token);
    }
}
