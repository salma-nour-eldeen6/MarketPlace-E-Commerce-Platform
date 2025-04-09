using System.Net;
using System.Numerics;
namespace e_commerce.Models
{
    public class User
    {
        public int UserID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
        public required string Phone { get; set; }

        public required Vendor Vendor { get; set; }
        public required Admin Admin { get; set; }
        public required Customer Customer { get; set; }

        public required ICollection<Grant> Grants { get; set; }
        public required ICollection<PostInteraction> PostInteractions { get; set; }
        public required ICollection<Address> Addresses { get; set; }
    }
}
