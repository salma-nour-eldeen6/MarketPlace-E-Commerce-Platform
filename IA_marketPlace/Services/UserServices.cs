using IA_marketPlace.Data;
using IA_marketPlace.Models;
using IA_marketPlace.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace IA_marketPlace.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly IVendorRepository _vendorRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ITokenServices _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailEncryptionService _emailEncryptionService;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IHubContext<NotificationHub> _hubContext;

        public UserServices(
            IUserRepository userRepository,
            IVendorRepository vendorRepository,
            IPasswordHasher<User> passwordHasher,
            ITokenServices tokenService,
            IHttpContextAccessor httpContextAccessor,
            IEmailEncryptionService emailEncryptionService,
            IRefreshTokenRepository refreshTokenRepository,
             IHubContext<NotificationHub> hubContext)
        {
            _userRepository = userRepository;
            _vendorRepository = vendorRepository;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
            _refreshTokenRepository = refreshTokenRepository;
            _emailEncryptionService = emailEncryptionService;
            _hubContext = hubContext;

        }

        // Register Async
        public async Task<string> RegisterAsync(UserDTO userDto)
        {
            if (string.IsNullOrWhiteSpace(userDto.Name) || userDto.Name.Length < 3)
                return "Name must be at least 3 characters.";

            if ( _userRepository.UserExists(userDto.Email))
                return "Email already exists.";

            var user = new User
            {
                Name = userDto.Name,
                Email = _emailEncryptionService.Encrypt(userDto.Email),
                Role = userDto.Role,
                Phone = userDto.Phone,
                Address = userDto.Address
            };

            user.Password = _passwordHasher.HashPassword(user, userDto.Password);

            await _userRepository.InsertAsync(user);

            if (userDto.Role == "Vendor")
            {
                var vendor = new Vendor
                {
                    VendorId = user.UserId,
                    IsApproval = false,
                    AdminId = 1
                };

                await _vendorRepository.InsertAsync(vendor);
                await _hubContext.Clients.All.SendAsync("ReceiveVendorLoginNotification", $"{user.Name} (Vendor) has logged in.");

                return "Registration successful. Waiting for admin approval.";
            }
            else if (userDto.Role == "Customer")
            {
                return "Registration successful.";
            }

            return "Unexpected error.";
        }

        // Login Async
        public async Task<TokenResponse> LoginAsync(LoginDTO loginDto)
        {
            var user =  _userRepository.GetUserByEmail(loginDto.Email);

            if (user == null)
            {
                return new TokenResponse { Message = "Invalid email or password." };
            }

            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, loginDto.Password);

            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                return new TokenResponse { Message = "Invalid email or password." };
            }
         

            if (user.Role == "Vendor")
            {
                var vendor = await _vendorRepository.GetVendorByUserIdAsync(user.UserId);
                if (vendor == null || vendor.IsApproval != true)
                {
                    return new TokenResponse { Message = "Vendor account is not approved yet." };
                }
            }

            var token = _tokenService.GenerateToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();
            await _refreshTokenRepository.SaveRefreshTokenAsync(user.UserId, refreshToken);
            
            return new TokenResponse
            {
                Message = "Login successful.",
                RefreshToken = refreshToken,
                Token = token,
                Expiration = DateTime.Now.AddMinutes(4),
                Role = user.Role
            };
        }

        // Logout Async
        public async Task<string> LogoutAsync()
        {
            try
            {
                Console.WriteLine("Start Logout");

                var user = _httpContextAccessor.HttpContext?.User;
                if (user == null)
                {
                    return "HttpContext or User is null.";
                }

                var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                //  Console.WriteLine($"User ID: {userId}");

                if (userId == null)
                {
                    return "User not found.";
                }


                var refreshToken = await _refreshTokenRepository.GetRefreshTokenByUserId(int.Parse(userId));


                await _refreshTokenRepository.DeleteRefreshTokenAsync(refreshToken);

                return "Logged out successfully.";
            }
            catch (Exception ex)
            {
                return $"An error occurred: {ex.Message}";
            }
        }


    }
}
