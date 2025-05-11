using IA_marketPlace.Data;
using IA_marketPlace.Models;

namespace IA_marketPlace.Repository
{
    public interface IUserRepository : IGenericRepository<User>
    {
   
        bool UserExists(string email);
        User GetUserByEmail(string email);
     
        User GetUserByRefreshToken(string token);
        Task<User> GetUserByIdAsync(int userId);
    }
}
