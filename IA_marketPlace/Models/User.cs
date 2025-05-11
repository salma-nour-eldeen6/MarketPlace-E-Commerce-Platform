using Microsoft.Extensions.Hosting;
using System.Numerics;

namespace IA_marketPlace.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string? Name { get; set; }

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string? Role { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public virtual ICollection<Grant> GrantAdmins { get; set; } = new List<Grant>();

        public virtual ICollection<Grant> GrantVendors { get; set; } = new List<Grant>();

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        public virtual ICollection<Post> PostsNavigation { get; set; } = new List<Post>();

        public virtual ICollection<Product> ProductsNavigation { get; set; } = new List<Product>();

        public virtual ICollection<TrackPurchase> TrackPurchaseCustomers { get; set; } = new List<TrackPurchase>();

        public virtual ICollection<TrackPurchase> TrackPurchaseVendors { get; set; } = new List<TrackPurchase>();

        public virtual ICollection<Vendor> VendorAdmins { get; set; } = new List<Vendor>();

        public virtual ICollection<Vendor> VendorVendorNavigations { get; set; } = new List<Vendor>();

        public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

        public virtual ICollection<Post> Posts1 { get; set; } = new List<Post>();

        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
        public virtual ICollection<TrackPurchase> TrackPurchases { get; set; } = new List<TrackPurchase>();
        public ICollection<RefreshToken> RefreshTokens { get; set; }
        public ICollection<TokenResponse> TokenResponses { get; set; }

    }
}
