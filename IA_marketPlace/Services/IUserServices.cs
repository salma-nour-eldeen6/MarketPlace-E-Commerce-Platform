using IA_marketPlace.Data;
using IA_marketPlace.Models;

namespace IA_marketPlace.Services
{
    public interface IUserServices
    {
        Task<string> RegisterAsync(UserDTO userDto);
        Task<TokenResponse> LoginAsync(LoginDTO loginDto);
        Task<string> LogoutAsync();

    }
}
