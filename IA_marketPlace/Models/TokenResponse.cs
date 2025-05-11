namespace IA_marketPlace.Models
{
    public class TokenResponse
    {
        public int id { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? Expiration { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        public string Role { get; set; }
    }
}
